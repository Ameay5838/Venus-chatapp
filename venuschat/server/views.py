from rest_framework import viewsets
from .models import Server
from .serializer import ServerSerializer
from rest_framework.response import Response
from .schema import server_list_docs
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated

class ServerListViewSet(viewsets.ViewSet):
    # Define the base queryset for the viewset
    queryset = Server.objects.all()
    #permission_classes = [IsAuthenticated]
    
    @server_list_docs
    # Define the list method to handle GET requests
    def list(self, request):
        # Extract query parameters from the request
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"
        
        # Check if the user is authenticated if by_user or by_serverid is set
        # if by_user or (by_serverid and not request.user.is_authenticated):
        #     raise AuthenticationFailed()
        
        # Filter the queryset by category if the parameter is provided
        if category:
            self.queryset = self.queryset.filter(category__name=category)
        
        # Filter the queryset by the current user's membership if by_user is set
        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed()
        
        # Limit the number of results returned if qty is provided
        if qty:
            self.queryset = self.queryset[:int(qty)]
        
        # Annotate the queryset with the number of members if with_num_members is set
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))
        
        # Filter the queryset by server ID if by_serverid is provided
        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"Server with id {by_serverid} not found")
            except ValueError:
                raise ValidationError(detail="Server Value Error")
        
        # Serialize the queryset and return the response
        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)
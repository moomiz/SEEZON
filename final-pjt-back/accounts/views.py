from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth import get_user_model

from .serializers import UserSerializer

# Create your views here.

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete(request):
    request.user.delete()
    logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def user_detail(request, username):
    user = get_object_or_404(get_user_model(), username=username)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_update(request, username):
    user = get_object_or_404(get_user_model(), username=username)
    serializer = UserSerializer(data=request.data, instance=user)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def following(request, user_pk):
    person = get_object_or_404(get_user_model(), pk=user_pk)
    user = request.user
    if person != user:
        if person.followers.filter(pk=user.pk).exists():
            person.followers.remove(user)
        else:
            person.followers.add(user)
        return Response(status=status.HTTP_200_OK)
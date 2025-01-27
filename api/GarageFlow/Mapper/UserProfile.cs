using AutoMapper;
using GarageFlow.CQRS.User;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<AppUser, UserResponse>();
    }
}
using AutoMapper;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GarageFlow.CQRS.User.Queries.GetAllUsers;

public class GetAllUsersQueryHandler(UserManager<AppUser> userManager, IMapper mapper) : IRequestHandler<GetAllUsersQuery, List<UserResponse>>
{
    public async Task<List<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await userManager.Users.ToListAsync(cancellationToken);

        var usersDto = mapper.Map<List<UserResponse>>(users);

        for (int i = 0; i < usersDto.Count; i++)
        {
            usersDto[i].Roles = await userManager.GetRolesAsync(users[i]) as List<string>;
        }

        return usersDto;
    }
}
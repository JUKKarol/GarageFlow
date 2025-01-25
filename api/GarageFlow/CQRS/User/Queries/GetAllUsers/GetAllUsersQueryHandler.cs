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

        return mapper.Map<List<UserResponse>>(users);
    }
}
using GarageFlow.CQRS.User.Commands.UnassignUserRole;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.User.Queries.GetFullUserInfo;

public class GetFullUserInfoQueryHandler(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager) : IRequestHandler<GetFullUserInfoQuery, GetFullUserInfoResponse>
{
    public async Task<GetFullUserInfoResponse> Handle(GetFullUserInfoQuery request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.UserId.ToString())
            ?? throw new NotFoundException(nameof(AppUser), request.UserId.ToString());

        var roles = await userManager.GetRolesAsync(user);
        var identityRoles = new List<string>();

        foreach (var roleName in roles)
        {
            var role = await roleManager.FindByNameAsync(roleName);
            if (role != null)
            {
                identityRoles.Add(role.Name);
            }
        }

        return new GetFullUserInfoResponse
        {
            UserId = Guid.Parse(user.Id),
            UserName = user.UserName,
            Email = user.Email,
            EmailConfirmed = user.EmailConfirmed,
            PhoneNumber = user.PhoneNumber,
            Roles = identityRoles
        };
    }
}
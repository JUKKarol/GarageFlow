using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.User.Commands.UnAssignUserRole;

public class UnassignUserRoleCommandHandler(UserManager<AppUser> userManager,
    RoleManager<IdentityRole> roleManager) : IRequestHandler<UnassignUserRoleCommand>
{
    public async Task Handle(UnassignUserRoleCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NotFoundException(nameof(AppUser), request.Email);

        var role = await roleManager.FindByNameAsync(request.Role)
            ?? throw new NotFoundException(nameof(IdentityRole), request.Role);

        await userManager.RemoveFromRoleAsync(user, role.Name);
    }
}
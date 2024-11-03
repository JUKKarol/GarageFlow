using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.User.Commands.UnAssignRole;

public class UnAssignUserRoleCommandHandler(UserManager<AppUser> userManager,
    RoleManager<IdentityRole> roleManager) : IRequestHandler<UnAssignUserRoleCommand>
{
    public async Task Handle(UnAssignUserRoleCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NotFoundException(nameof(AppUser), request.Email);

        var role = await roleManager.FindByNameAsync(request.Role)
            ?? throw new NotFoundException(nameof(IdentityRole), request.Role);

        await userManager.RemoveFromRoleAsync(user, role.Name);
    }
}
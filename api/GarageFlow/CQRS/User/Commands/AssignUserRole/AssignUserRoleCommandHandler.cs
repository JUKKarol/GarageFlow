using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.User.Commands.AssignUserRole;

public class AssignUserRoleCommandHandler(UserManager<AppUser> userManager,
    RoleManager<IdentityRole> roleManager) : IRequestHandler<AssignUserRoleCommand>
{
    public async Task Handle(AssignUserRoleCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new NotFoundException(nameof(AppUser), request.Email);

        var role = await roleManager.FindByNameAsync(request.Role)
            ?? throw new NotFoundException(nameof(IdentityRole), request.Role);

        await userManager.AddToRoleAsync(user, role.Name);
    }
}
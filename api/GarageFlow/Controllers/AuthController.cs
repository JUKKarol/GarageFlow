using GarageFlow.Constants;
using GarageFlow.CQRS.User.Commands.AssignUserRole;
using GarageFlow.CQRS.User.Commands.UnassignRole;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("userRole")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> AssignUserRole(AssignUserRoleCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("userRole")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> UnassignUserRole(UnassignUserRoleCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }
}
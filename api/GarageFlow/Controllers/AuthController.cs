using GarageFlow.Constants;
using GarageFlow.CQRS.User.Commands.AssignUserRole;
using GarageFlow.CQRS.User.Commands.UnassignUserRole;
using GarageFlow.CQRS.User.Queries.GetUserToken;
using GarageFlow.Entities;
using GarageFlow.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService) : ControllerBase
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

    [HttpPost("login/jwt")]
    public async Task<IActionResult> Login([FromBody] GetUserTokenQuery command)
    {
        var userToken = await mediator.Send(command);
        return Ok(userToken);
    }
}
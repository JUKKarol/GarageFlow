using GarageFlow.Constants;
using GarageFlow.CQRS.User.Commands.AssignUserRole;
using GarageFlow.CQRS.User.Commands.UnassignUserRole;
using GarageFlow.CQRS.User.Queries.GetFullUserInfo;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
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

    [HttpGet("manage/info/full")]
    [Authorize]
    public async Task<IActionResult> GetFullInfo()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var query = new GetFullUserInfoQuery { UserId = Guid.Parse(userId) };
        var result = await mediator.Send(query);
        return Ok(result);
    }
}
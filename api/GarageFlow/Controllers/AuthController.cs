using GarageFlow.Constants;
using GarageFlow.CQRS.User.Commands.AssignUserRole;
using GarageFlow.CQRS.User.Commands.UnassignRole;
using GarageFlow.Entities;
using GarageFlow.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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

    [HttpPost("login1")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var model1 = model;
        var user = await userManager.FindByEmailAsync(model.Username);
        if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
        {
            var token = tokenService.GenerateToken(user.Id);
            return Ok(new { Token = token });
        }

        return Unauthorized();
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
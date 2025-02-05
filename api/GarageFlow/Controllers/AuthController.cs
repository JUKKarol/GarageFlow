using GarageFlow.Constants;
using GarageFlow.CQRS.User.Commands.AssignUserRole;
using GarageFlow.CQRS.User.Commands.UnAssignUserRole;
using GarageFlow.CQRS.User.Queries.GetAllUsers;
using GarageFlow.CQRS.User.Queries.GetFullUserInfo;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;

namespace GarageFlow.Controllers;

/// <summary>
/// Controller for managing user authentication and roles.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Assigns a role to a user.
    /// </summary>
    /// <param name="command">The command containing the user's email and the role to assign.</param>
    /// <returns>No content.</returns>
    [SwaggerResponse(StatusCodes.Status204NoContent, "The role has been successfully assigned to the user")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The user was not found")]
    [HttpPost("userRole")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> AssignUserRole(AssignUserRoleCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Unassigns a role from a user.
    /// </summary>
    /// <param name="command">The command containing the user's email and the role to unassign.</param>
    /// <returns>No content.</returns>
    [SwaggerResponse(StatusCodes.Status204NoContent, "The role has been successfully unassigned from the user")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The user was not found")]
    [HttpDelete("userRole")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> UnassignUserRole(UnassignUserRoleCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Retrieves full information about the authenticated user.
    /// </summary>
    /// <returns>The full information about the authenticated user.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The full information about the authenticated user has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "The user is not authenticated")]
    [HttpGet("manage/info/full")]
    [Authorize]
    public async Task<IActionResult> GetFullInfo()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var query = new GetFullUserInfoQuery { UserId = Guid.Parse(userId) };
        var result = await mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Retrieves all users
    /// </summary>
    /// <returns>Id, name and email of all users.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all users has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "The user is not authenticated")]
    [HttpGet("user")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> GetAllUsers()
    {
        var query = new GetAllUsersQuery();
        var result = await mediator.Send(query);
        return Ok(result);
    }
}
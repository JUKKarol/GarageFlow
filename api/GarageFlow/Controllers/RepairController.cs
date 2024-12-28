using GarageFlow.Constants;
using GarageFlow.CQRS.Repair.Commands.CreateRepair;
using GarageFlow.CQRS.Repair.Commands.UpdateRepair;
using GarageFlow.CQRS.Repair.Queries.GetRepairsById;
using GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RepairController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateRepair(CreateRepairCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateRepair(UpdateRepairCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    [HttpGet("{Id}")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> GetRepairById([FromRoute] GetRepairsByIdQuery query)
    {
        var repair = await mediator.Send(query);
        return Ok(repair);
    }

    [HttpGet("Status/{Status}")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> GetRepairByStatus([FromRoute] GetRepairsByStatusQuery query)
    {
        var repairs = await mediator.Send(query);
        return Ok(repairs);
    }
}
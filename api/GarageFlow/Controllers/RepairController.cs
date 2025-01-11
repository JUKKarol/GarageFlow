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
using Sieve.Models;

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

    [HttpPost("Invoice")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> PrintInvoice(GetInvoiceQuery query)
    {
        var invoice = await mediator.Send(query);
        return Ok(invoice);
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
    public async Task<IActionResult> GetRepairById([FromRoute] GetRepairByIdQuery query)
    {
        var repair = await mediator.Send(query);
        return Ok(repair);
    }

    [HttpGet]
    public async Task<IActionResult> GetRepairs([FromQuery] SieveModel query)
    {
        GetRepairsQuery getRepairsQuery = new GetRepairsQuery
        {
            Query = query
        };

        var repairs = await mediator.Send(getRepairsQuery);
        return Ok(repairs);
    }
}
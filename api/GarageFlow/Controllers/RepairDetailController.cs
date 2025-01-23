using GarageFlow.Constants;
using GarageFlow.CQRS.RepairDetail.Commands.CreateRepairDetail;
using GarageFlow.CQRS.RepairDetail.Commands.DeleteRepairDetailById;
using GarageFlow.CQRS.RepairDetail.Commands.UpdateRepairDetail;
using GarageFlow.CQRS.RepairDetail.Queries.GetRepairDetailsByRepairId;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RepairDetailController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateRepairDetail(CreateRepairDetailCommand command)
    {
        var repairDetail = await mediator.Send(command);
        return Ok(repairDetail);
    }

    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateRepairDetail(UpdateRepairDetailCommand command)
    {
        var repairDetail = await mediator.Send(command);
        return Ok(repairDetail);
    }

    [HttpGet("{RepairId}")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> GetRepairDetailsByRepairId([FromRoute] GetRepairDetailsByRepairIdQuery query)
    {
        var repairDetails = await mediator.Send(query);
        return Ok(repairDetails);
    }

    [HttpDelete("{Id}")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> DeleteRepairDetailById([FromRoute] DeleteRepairDetailByIdCommand query)
    {
        await mediator.Send(query);
        return NoContent();
    }
}
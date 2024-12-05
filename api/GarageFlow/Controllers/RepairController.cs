using GarageFlow.Constants;
using GarageFlow.CQRS.Repair.Commands.CreateRepair;
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
    [Authorize(Roles = UserRoles.Client)]
    public async Task<IActionResult> CreateRepair(CreateRepairCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }
}
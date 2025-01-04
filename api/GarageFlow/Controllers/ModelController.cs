using GarageFlow.Constants;
using GarageFlow.CQRS.Model.Commands.CreateModel;
using GarageFlow.CQRS.Model.Commands.UpdateModel;
using GarageFlow.CQRS.Model.Queries.GetModels;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ModelController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateModel(CreateModelCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateModel(UpdateModelCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> GetModels([FromQuery] SieveModel query)
    {
        GetModelsQuery getModelsQuery = new GetModelsQuery
        {
            Query = query
        };

        var models = await mediator.Send(getModelsQuery);
        return Ok(models);
    }
}
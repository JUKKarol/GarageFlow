using GarageFlow.Constants;
using GarageFlow.CQRS.Brands.Commands.CreateBrand;
using GarageFlow.CQRS.Brands.Commands.UpdateBrand;
using GarageFlow.CQRS.Brands.Queries.GetBrands;
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
public class BrandController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateBrand(CreateBrandCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateBrand(UpdateBrandCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> GetBrands([FromQuery] SieveModel query)
    {
        GetBrandsQuery getBrandsQuery = new GetBrandsQuery
        {
            Query = query
        };

        var repairs = await mediator.Send(getBrandsQuery);
        return Ok(repairs);
    }
}
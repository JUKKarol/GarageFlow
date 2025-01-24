﻿using GarageFlow.Constants;
using GarageFlow.CQRS.Brands.Commands.CreateBrand;
using GarageFlow.CQRS.Brands.Commands.UpdateBrand;
using GarageFlow.CQRS.Brands.Queries.GetBrands;
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
        var brand = await mediator.Send(command);
        return Ok(brand);
    }

    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateBrand(UpdateBrandCommand command)
    {
        var brand = await mediator.Send(command);
        return Ok(brand);
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
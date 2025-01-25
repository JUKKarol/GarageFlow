using GarageFlow.Constants;
using GarageFlow.CQRS.Brands.Commands.CreateBrand;
using GarageFlow.CQRS.Brands.Commands.UpdateBrand;
using GarageFlow.CQRS.Brands.Queries.GetBrands;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace GarageFlow.Controllers;

/// <summary>
/// Controller for managing brands.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class BrandController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Create new car brand
    /// </summary>
    /// <remarks>
    /// Endpoint for creating new car brand.
    /// </remarks>
    [SwaggerResponse(StatusCodes.Status200OK, "The brand has been successfully created")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "The brand name has been already exists")]
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateBrand(CreateBrandCommand command)
    {
        var brand = await mediator.Send(command);
        return Ok(brand);
    }

    /// <summary>
    /// Update existing car brand
    /// </summary>
    /// <remarks>
    /// Endpoint for updating an existing car brand.
    /// </remarks>
    [SwaggerResponse(StatusCodes.Status200OK, "The brand has been successfully updated")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The brand was not found")]
    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateBrand(UpdateBrandCommand command)
    {
        var brand = await mediator.Send(command);
        return Ok(brand);
    }

    /// <summary>
    /// Get list of car brands
    /// </summary>
    /// <remarks>
    /// Endpoint for retrieving a list of car brands.
    /// </remarks>
    [SwaggerResponse(StatusCodes.Status200OK, "The list of brands has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request query contains validation errors")]
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
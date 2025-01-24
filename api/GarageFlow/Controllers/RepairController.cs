using GarageFlow.Constants;
using GarageFlow.CQRS.Repair.Commands.CreateRepair;
using GarageFlow.CQRS.Repair.Commands.UpdateRepair;
using GarageFlow.CQRS.Repair.Queries.GetInvoice;
using GarageFlow.CQRS.Repair.Queries.GetRepairsById;
using GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RepairController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
{
    /// <summary>
    /// Registers a new user
    /// </summary>
    /// <remarks>
    /// Endpoint for registering a new user in the system
    /// </remarks>
    [SwaggerResponse(StatusCodes.Status200OK, "The repair has been successfully created")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "The repair already exists")]
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateRepair(CreateRepairCommand command)
    {
        var repair = await mediator.Send(command);
        return Ok(repair);
    }

    /// <summary>
    /// Prints the invoice for a repair.
    /// </summary>
    /// <param name="query">The query containing the invoice details.</param>
    /// <returns>The invoice for the repair.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The invoice has been successfully generated")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The repair was not found")]
    [HttpPost("Invoice")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> PrintInvoice(GetInvoiceQuery query)
    {
        var invoice = await mediator.Send(query);
        return Ok(invoice);
    }

    /// <summary>
    /// Updates an existing repair.
    /// </summary>
    /// <param name="command">The command containing the updated repair details.</param>
    /// <returns>The updated repair.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The repair has been successfully updated")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The repair was not found")]
    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateRepair(UpdateRepairCommand command)
    {
        var repair = await mediator.Send(command);
        return Ok(repair);
    }

    /// <summary>
    /// Retrieves a repair by its ID.
    /// </summary>
    /// <param name="query">The query containing the repair ID.</param>
    /// <returns>The repair details.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The repair has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The repair was not found")]
    [HttpGet("{Id}")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> GetRepairById([FromRoute] GetRepairByIdQuery query)
    {
        var repair = await mediator.Send(query);
        return Ok(repair);
    }

    /// <summary>
    /// Retrieves a list of repairs based on the provided query.
    /// </summary>
    /// <param name="query">The query parameters for filtering and sorting repairs.</param>
    /// <returns>A list of repairs.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The list of repairs has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request query contains validation errors")]
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
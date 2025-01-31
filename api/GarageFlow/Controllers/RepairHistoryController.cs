using GarageFlow.Constants;
using GarageFlow.CQRS.Car.Commands.CreateCar;
using GarageFlow.CQRS.Car.Queries.GetCars;
using GarageFlow.CQRS.RepairHistory.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace GarageFlow.Controllers;

/// <summary>
/// Controller for managing repair history.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RepairHistoryController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Gets a list of repair history.
    /// </summary>
    /// <param name="query">The repair id.</param>
    /// <returns>A list of repair id for specified repair.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The list of repair history has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request query contains validation errors")]
    [HttpGet("{RepairId}")]
    public async Task<IActionResult> GetRepairHistory([FromRoute] GetRepairHistoryByRepairIdQuery query)
    {
        var cars = await mediator.Send(query);
        return Ok(cars);
    }
}
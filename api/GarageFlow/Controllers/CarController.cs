using GarageFlow.Constants;
using GarageFlow.CQRS.Car.Commands.CreateCar;
using GarageFlow.CQRS.Car.Commands.UpdateCar;
using GarageFlow.CQRS.Car.Queries.GetCars;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace GarageFlow.Controllers;

/// <summary>
/// Controller for managing cars.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CarController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Creates a new car.
    /// </summary>
    /// <param name="command">The command containing the car details.</param>
    /// <returns>The created car.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The car has been successfully created")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "The car already exists")]
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateCar(CreateCarCommand command)
    {
        var car = await mediator.Send(command);
        return Ok(car);
    }

    /// <summary>
    /// Updates an existing car.
    /// </summary>
    /// <param name="command">The command containing the updated car details.</param>
    /// <returns>The updated car.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The car has been successfully updated")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The car was not found")]
    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateCar(UpdateCarCommand command)
    {
        var car = await mediator.Send(command);
        return Ok(car);
    }

    /// <summary>
    /// Gets a list of cars.
    /// </summary>
    /// <param name="query">The query parameters for filtering and pagination.</param>
    /// <returns>A list of cars.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The list of cars has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request query contains validation errors")]
    [HttpGet]
    public async Task<IActionResult> GetCars([FromQuery] SieveModel query)
    {
        GetCarsQuery getCarsQuery = new GetCarsQuery
        {
            Query = query
        };

        var cars = await mediator.Send(getCarsQuery);
        return Ok(cars);
    }
}
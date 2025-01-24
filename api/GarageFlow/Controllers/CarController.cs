using GarageFlow.Constants;
using GarageFlow.CQRS.Car.Command.CreateCar;
using GarageFlow.CQRS.Car.Command.UpdateCar;
using GarageFlow.CQRS.Car.Query.GetCars;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace GarageFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateCar(CreateCarCommand command)
    {
        var car = await mediator.Send(command);
        return Ok(car);
    }

    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateCar(UpdateCarCommand command)
    {
        var car = await mediator.Send(command);
        return Ok(car);
    }

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
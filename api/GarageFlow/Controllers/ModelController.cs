using GarageFlow.Constants;
using GarageFlow.CQRS.Model.Commands.CreateModel;
using GarageFlow.CQRS.Model.Commands.DeleteModel;
using GarageFlow.CQRS.Model.Commands.UpdateModel;
using GarageFlow.CQRS.Model.Queries.GetModels;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace GarageFlow.Controllers;

/// <summary>
/// Controller for managing models.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ModelController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Creates a new model.
    /// </summary>
    /// <param name="command">The command containing the model details.</param>
    /// <returns>The created model.</returns>
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateModel(CreateModelCommand command)
    {
        var model = await mediator.Send(command);
        return Ok(model);
    }

    /// <summary>
    /// Updates an existing model.
    /// </summary>
    /// <param name="command">The command containing the updated model details.</param>
    /// <returns>The updated model.</returns>
    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateModel(UpdateModelCommand command)
    {
        var model = await mediator.Send(command);
        return Ok(model);
    }

    /// <summary>
    /// Retrieves a list of models based on the provided query.
    /// </summary>
    /// <param name="query">The query parameters for filtering and sorting models.</param>
    /// <returns>A list of models.</returns>
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

    /// <summary>
    /// Deletes model based on the Id.
    /// </summary>
    /// <param name="command"> The command containing the model Id.</param>
    /// <returns> No content </returns>
    [HttpDelete("{Id}")]
    public async Task<IActionResult> DeleteModels([FromRoute] DeleteModelCommand command)
    {
        await mediator.Send(command);
        return NoContent();
    }
}
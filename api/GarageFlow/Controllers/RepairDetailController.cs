using GarageFlow.Constants;
using GarageFlow.CQRS.RepairDetail.Commands.CreateRepairDetail;
using GarageFlow.CQRS.RepairDetail.Commands.DeleteRepairDetailById;
using GarageFlow.CQRS.RepairDetail.Commands.UpdateRepairDetail;
using GarageFlow.CQRS.RepairDetail.Queries.GetRepairDetailsByRepairId;
using GarageFlow.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace GarageFlow.Controllers;

/// <summary>
/// Controller for managing repair details.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RepairDetailsController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Creates a new repair detail.
    /// </summary>
    /// <param name="command">The command containing the repair detail information.</param>
    /// <returns>The created repair detail.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The repair detail has been successfully created")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "The repair detail already exists")]
    [HttpPost]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> CreateRepairDetail(CreateRepairDetailCommand command)
    {
        var repairDetail = await mediator.Send(command);
        return Ok(repairDetail);
    }

    /// <summary>
    /// Updates an existing repair detail.
    /// </summary>
    /// <param name="command">The command containing the updated repair detail information.</param>
    /// <returns>The updated repair detail.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The repair detail has been successfully updated")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request body contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The repair detail was not found")]
    [HttpPatch]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> UpdateRepairDetail(UpdateRepairDetailCommand command)
    {
        var repairDetail = await mediator.Send(command);
        return Ok(repairDetail);
    }

    /// <summary>
    /// Retrieves a list of repair details based on the provided query.
    /// </summary>
    /// <param name="query">The query parameters for filtering and sorting repair details.</param>
    /// <returns>A list of repair details.</returns>
    [SwaggerResponse(StatusCodes.Status200OK, "The list of repair details has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request query contains validation errors")]
    [HttpGet("{RepairId}")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> GetRepairDetailsByRepairId([FromRoute] GetRepairDetailsByRepairIdQuery query)
    {
        var repairDetails = await mediator.Send(query);
        return Ok(repairDetails);
    }

    /// <summary>
    /// Deletes a repair detail by ID.
    /// </summary>
    /// <param name="query">The command containing the ID of the repair detail to delete.</param>
    /// <returns>No content.</returns>
    [SwaggerResponse(StatusCodes.Status204NoContent, "The repair detail has been successfully deleted")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "The repair detail was not found")]
    [HttpDelete("{Id}")]
    [Authorize(Roles = UserRoles.Employee)]
    public async Task<IActionResult> DeleteRepairDetailById([FromRoute] DeleteRepairDetailByIdCommand query)
    {
        await mediator.Send(query);
        return NoContent();
    }
}
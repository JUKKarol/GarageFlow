using GarageFlow.CQRS.Car.Queries.GetCurrentCarRepairHistoryByVin;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace GarageFlow.Controllers;

/// <summary>
/// Controller for customer info.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CustomerController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Get car status history by vin.
    /// </summary>
    /// <remarks>
    /// Endpoint for getting car status history by vin.
    /// </remarks>
    [SwaggerResponse(StatusCodes.Status200OK, "The list of brands has been successfully retrieved")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "The request query contains validation errors")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Car does not exists")]
    [HttpGet("{Vin}")]
    public async Task<IActionResult> GetStatusByVin([FromRoute] GetCurrentCarRepairHistoryByVinQuery query)
    {
        var repairHistories = await mediator.Send(query);
        return Ok(repairHistories);
    }
}
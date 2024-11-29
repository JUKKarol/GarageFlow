using GarageFlow.Entities;
using MediatR;
using System.Text.Json.Serialization;

namespace GarageFlow.CQRS.Repair.Commands.CreateRepair;

public class CreateRepairCommand : IRequest
{
    public DateTime StartedEstimateAt { get; set; }
    public string Description { get; set; }
    public Guid CarId { get; set; }

    [JsonIgnore]
    public Guid CustomerId { get; set; }
}
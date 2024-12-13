using GarageFlow.Entities;
using MediatR;
using System.Text.Json.Serialization;

namespace GarageFlow.CQRS.Repair.Commands.CreateRepair;

public class CreateRepairCommand : IRequest
{
    public DateOnly PlannedFinishAt { get; set; }
    public DateOnly PlannedStartdAt { get; set; }
    public string Description { get; set; }
    public string customerName { get; set; }
    public string customerPhoneNumber { get; set; }
    public string customerEmail { get; set; }
}
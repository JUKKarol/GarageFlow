using MediatR;

namespace GarageFlow.CQRS.Repair.Commands.CreateRepair;

public class CreateRepairCommand : IRequest<RepairResponse>
{
    public DateOnly PlannedFinishAt { get; set; }
    public DateOnly PlannedStartAt { get; set; }
    public string Description { get; set; }
    public string customerName { get; set; }
    public string customerPhoneNumber { get; set; }
    public string customerEmail { get; set; }

    public Guid CarId { get; set; }
}
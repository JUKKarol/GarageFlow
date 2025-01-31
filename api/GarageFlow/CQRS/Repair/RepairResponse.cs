using GarageFlow.Enums;

namespace GarageFlow.CQRS.Repair;

public class RepairResponse
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateOnly StartedAt { get; set; }
    public DateOnly PlannedStartAt { get; set; }
    public DateOnly FinishedAt { get; set; }
    public DateOnly PlannedFinishAt { get; set; }
    public string Description { get; set; }
    public string CustomerName { get; set; }
    public string CustomerPhoneNumber { get; set; }
    public string CustomerEmail { get; set; }

    public Guid? CarId { get; set; }
}
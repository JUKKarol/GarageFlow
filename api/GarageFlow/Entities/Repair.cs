using GarageFlow.Enums;

namespace GarageFlow.Entities;

public class Repair
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateOnly StartedAt { get; set; }
    public DateOnly PlannedStartAt { get; set; }
    public DateOnly FinishedAt { get; set; }
    public DateOnly PlannedFinishAt { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public string CustomerName { get; set; }
    public string CustomerPhoneNumber { get; set; }
    public string CustomerEmail { get; set; }
    public RepairStatus Status { get; set; } = RepairStatus.Waiting;
    //public Guid CarId { get; set; }

    public Car Car { get; set; }
    public List<AppUser> Users { get; set; }
}
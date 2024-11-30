using GarageFlow.Enums;

namespace GarageFlow.Entities;

public class Repair
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateOnly StartedAt { get; set; }
    public DateOnly StartedEstimateAt { get; set; }
    public DateOnly FinishedAt { get; set; }
    public DateOnly FinisheEstimatedAt { get; set; }
    public int Price { get; set; }
    public int PriceEstimate { get; set; }
    public string Description { get; set; }
    public Guid CarId { get; set; }
    public Guid CustomerId { get; set; }
    public RepairStatus Status { get; set; } = RepairStatus.Waiting;

    public Car Car { get; set; }
    public List<AppUser> Users { get; set; }
}
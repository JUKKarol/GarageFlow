using GarageFlow.Enums;

namespace GarageFlow.Entities;

public class Repair
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime StartedAt { get; set; }
    public DateTime StartedEstimateAt { get; set; }
    public DateTime FinishedAt { get; set; }
    public DateTime FinisheEstimatedAt { get; set; }
    public int Price { get; set; }
    public int PriceEstimate { get; set; }
    public string Description { get; set; }
    public Guid CarId { get; set; }
    public Guid CustomerId { get; set; }
    public RepairStatus Status { get; set; } = RepairStatus.Waiting;

    public Car Car { get; set; }
    public List<AppUser> Users { get; set; }
}
using GarageFlow.Enums;

namespace GarageFlow.Entities;

public class Repair
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public int Price { get; set; }
    public string Description { get; set; }
    public Guid CarId { get; set; }
    public Guid CustomerId { get; set; }
    public RepairStatus Status { get; set; } = RepairStatus.Active;

    public Car Car { get; set; }
    public List<AppUser> Users { get; set; }
}
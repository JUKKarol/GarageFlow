using GarageFlow.Enums;

namespace GarageFlow.Entities;

public class RepairHistory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public RepairStatus Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid RepairId { get; set; }

    public Repair Repair { get; set; }
}
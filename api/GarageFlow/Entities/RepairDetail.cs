using GarageFlow.Enums;

namespace GarageFlow.Entities;

public class RepairDetail
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public RepairDetailType RepairDetailType { get; set; }
    public Guid RepairId { get; set; }

    public Repair Repair { get; set; }
}
namespace GarageFlow.Entities;

public class RepairDetail
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Price { get; set; }
    public Guid RepairId { get; set; }

    public Repair Repair { get; set; }
}
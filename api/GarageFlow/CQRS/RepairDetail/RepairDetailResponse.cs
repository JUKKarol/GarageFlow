using GarageFlow.Enums;

namespace GarageFlow.CQRS.RepairDetail;

public class RepairDetailResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public RepairDetailType RepairDetailType { get; set; }
    public Guid RepairId { get; set; }
}
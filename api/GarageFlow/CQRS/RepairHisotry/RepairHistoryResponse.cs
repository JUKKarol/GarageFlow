using GarageFlow.Enums;

namespace GarageFlow.CQRS.RepairHistory;

public class RepairHistoryResponse
{
    public RepairStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
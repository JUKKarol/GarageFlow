using GarageFlow.CQRS.RepairDetail;

namespace GarageFlow.CQRS.Repair;

public class RepairWithDetailsResponse
{
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateOnly StartedAt { get; set; }
    public DateOnly PlannedStartAt { get; set; }
    public DateOnly FinishedAt { get; set; }
    public DateOnly PlannedFinishAt { get; set; }
    public string Description { get; set; }
    public List<RepairDetailResponse> RepairDetails { get; set; }
}
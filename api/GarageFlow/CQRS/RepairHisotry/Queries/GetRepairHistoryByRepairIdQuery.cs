using MediatR;

namespace GarageFlow.CQRS.RepairHistory.Queries;

public class GetRepairHistoryByRepairIdQuery : IRequest<List<RepairHistoryResponse>>
{
    public Guid RepairId { get; set; }
}
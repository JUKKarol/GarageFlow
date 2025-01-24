using MediatR;

namespace GarageFlow.CQRS.RepairDetail.Queries.GetRepairDetailsByRepairId;

public class GetRepairDetailsByRepairIdQuery : IRequest<List<RepairDetailResponse>>
{
    public Guid RepairId { get; set; }
}
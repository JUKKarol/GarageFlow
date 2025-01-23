using MediatR;

namespace GarageFlow.CQRS.RepairDetail.Commands.UpdateRepairDetail;

public class UpdateRepairDetailCommand : IRequest<RepairDetailResponse>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public Guid RepairId { get; set; }
}
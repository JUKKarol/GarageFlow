using MediatR;

namespace GarageFlow.CQRS.RepairDetail.Commands.CreateRepairDetail;

public class CreateRepairDetailCommand : IRequest<RepairDetailResponse>
{
    public string Name { get; set; }
    public int Price { get; set; }
    public Guid RepairId { get; set; }
}
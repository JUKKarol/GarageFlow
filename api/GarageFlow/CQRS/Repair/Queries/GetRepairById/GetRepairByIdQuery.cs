using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsById;

public class GetRepairByIdQuery : IRequest<RepairResponse>
{
    public Guid Id { get; set; }
}
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsById;

public class GetRepairsByIdQuery : IRequest<RepairResponse>
{
    public Guid Id { get; set; }
}
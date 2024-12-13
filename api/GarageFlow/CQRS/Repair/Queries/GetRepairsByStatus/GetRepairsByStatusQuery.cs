using GarageFlow.Enums;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;

public class GetRepairsByStatusQuery : IRequest<List<GarageFlow.Entities.Repair>>
{
    public RepairStatus RepairStatus { get; set; }
}
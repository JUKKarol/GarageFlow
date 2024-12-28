using GarageFlow.Enums;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;

public class GetRepairsByStatusQuery : IRequest<List<RepairResponse>>
{
    public RepairStatus Status { get; set; }
}
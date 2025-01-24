using MediatR;
using Sieve.Models;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;

public class GetRepairsQuery : IRequest<RespondListDto<RepairResponse>>
{
    public SieveModel Query { get; set; }
}
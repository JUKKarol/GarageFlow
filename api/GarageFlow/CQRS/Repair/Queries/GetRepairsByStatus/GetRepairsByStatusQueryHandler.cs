using AutoMapper;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;

public class GetRepairsByStatusQueryHandler(IMapper mapper,
    IRepairRepository repairRepository) : IRequestHandler<GetRepairsByStatusQuery, List<GarageFlow.Entities.Repair>>
{
    public async Task<List<GarageFlow.Entities.Repair>> Handle(GetRepairsByStatusQuery request, CancellationToken cancellationToken)
    {
        var repairs = await repairRepository.GetRepairsByStatus(request.RepairStatus, cancellationToken);
        return repairs;
    }
}
using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;

public class GetRepairsByStatusQueryHandler(IMapper mapper,
    IRepairRepository repairRepository) : IRequestHandler<GetRepairsByStatusQuery, List<RepairResponse>>
{
    public async Task<List<RepairResponse>> Handle(GetRepairsByStatusQuery request, CancellationToken cancellationToken)
    {
        var repairs = await repairRepository.GetRepairsByStatus(request.Status, cancellationToken);
        var repairsDtos = mapper.Map<List<RepairResponse>>(repairs);

        return repairsDtos;
    }
}
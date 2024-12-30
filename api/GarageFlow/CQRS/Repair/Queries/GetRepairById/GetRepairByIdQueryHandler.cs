using AutoMapper;
using GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsById;

public class GetRepairByIdQueryHandler(IRepairRepository repairRepository,
    IMapper mapper) : IRequestHandler<GetRepairByIdQuery, RepairResponse>
{
    public async Task<RepairResponse> Handle(GetRepairByIdQuery request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.Id, cancellationToken);
        var repairDto = mapper.Map<RepairResponse>(repair);

        return repairDto;
    }
}
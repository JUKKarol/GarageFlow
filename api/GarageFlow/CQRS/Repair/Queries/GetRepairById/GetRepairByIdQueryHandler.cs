using AutoMapper;
using GarageFlow.CQRS.RepairHistory;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairHistoryRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsById;

public class GetRepairByIdQueryHandler(IRepairRepository repairRepository,
    IRepairHistoryRepository repairHistoryRepository,
    IMapper mapper) : IRequestHandler<GetRepairByIdQuery, RepairResponse>
{
    public async Task<RepairResponse> Handle(GetRepairByIdQuery request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.Id, cancellationToken);
        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), request.Id.ToString());
        }

        var repairDto = mapper.Map<RepairResponse>(repair);
        var repairHisotry = await repairHistoryRepository.GetCurrentRepairHistoryByRepairId(repair.Id, cancellationToken);
        repairDto.RepairHistory = mapper.Map<RepairHistoryResponse>(repairHisotry);

        return repairDto;
    }
}
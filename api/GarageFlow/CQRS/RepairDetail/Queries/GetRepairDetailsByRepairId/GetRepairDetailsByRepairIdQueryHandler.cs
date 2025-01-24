using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.RepairDetail.Queries.GetRepairDetailsByRepairId;

public class GetRepairDetailsByRepairIdQueryHandler(IMapper mapper,
    IRepairDetailRepository repairDetailRepository,
    IRepairRepository repairRepository) : IRequestHandler<GetRepairDetailsByRepairIdQuery, List<RepairDetailResponse>>
{
    public async Task<List<RepairDetailResponse>> Handle(GetRepairDetailsByRepairIdQuery request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.RepairId, cancellationToken);
        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), request.RepairId.ToString());
        }

        var repairDetails = await repairDetailRepository.GetRepairDetailsByRepairId(request.RepairId, cancellationToken);
        var repairDetailDtos = mapper.Map<List<RepairDetailResponse>>(repairDetails);
        return repairDetailDtos;
    }
}
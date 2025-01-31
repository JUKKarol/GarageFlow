using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairHistoryRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.RepairHistory.Queries
{
    public class GetRepairHistoryByRepairIdQueryHandler(IMapper mapper,
        IRepairRepository repairRepository,
        IRepairHistoryRepository repairHistoryRepository) : IRequestHandler<GetRepairHistoryByRepairIdQuery, List<RepairHistoryResponse>>
    {
        public async Task<List<RepairHistoryResponse>> Handle(GetRepairHistoryByRepairIdQuery request, CancellationToken cancellationToken)
        {
            var repair = await repairRepository.GetRepairById(request.RepairId, cancellationToken);
            if (repair == null)
            {
                throw new NotFoundException(nameof(Repair), request.RepairId.ToString());
            }

            var repairHistory = await repairHistoryRepository.GetRepairHistoryByRepairId(request.RepairId, cancellationToken);
            return mapper.Map<List<RepairHistoryResponse>>(repairHistory);
        }
    }
}
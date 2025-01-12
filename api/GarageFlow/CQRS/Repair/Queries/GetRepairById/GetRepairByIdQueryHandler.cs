using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsById;

public class GetRepairByIdQueryHandler(IRepairRepository repairRepository,
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

        return repairDto;
    }
}
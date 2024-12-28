using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Commands.UpdateRepair;

public class UpdateRepairCommandHander(IMapper mapper,
    IRepairRepository repairRepository) : IRequestHandler<UpdateRepairCommand>
{
    public async Task Handle(UpdateRepairCommand request, CancellationToken cancellationToken)
    {
        var existingRepair = await repairRepository.GetRepairById(request.Id, cancellationToken);

        if (existingRepair == null)
        {
            throw new NotFoundException(nameof(Repair), request.Id.ToString());
        }

        var repair = mapper.Map<GarageFlow.Entities.Repair>(request);
        await repairRepository.UpdateRepair(repair, cancellationToken);
    }
}
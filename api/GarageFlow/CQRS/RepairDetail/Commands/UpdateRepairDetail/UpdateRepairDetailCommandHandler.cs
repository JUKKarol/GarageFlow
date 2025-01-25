using AutoMapper;
using GarageFlow.CQRS.User;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.RepairDetail.Commands.UpdateRepairDetail;

public class UpdateRepairDetailCommandHandler(IMapper mapper,
    IRepairDetailRepository repairDetailRepository,
    IRepairRepository repairRepository) : IRequestHandler<UpdateRepairDetailCommand, RepairDetailResponse>
{
    public async Task<RepairDetailResponse> Handle(UpdateRepairDetailCommand request, CancellationToken cancellationToken)
    {
        var repair = repairRepository.GetRepairById(request.RepairId, cancellationToken);
        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), request.RepairId.ToString());
        }

        var existingRepairDetail = await repairDetailRepository.GetRepairDetailById(request.Id, cancellationToken);
        if (existingRepairDetail == null)
        {
            throw new NotFoundException(nameof(RepairDetail), request.Id.ToString());
        }

        var repairDetail = mapper.Map<GarageFlow.Entities.RepairDetail>(request);

        await repairDetailRepository.UpdateRepairDetail(repairDetail, cancellationToken);

        var repairDetailDto = mapper.Map<RepairDetailResponse>(repairDetail);
        return repairDetailDto;
    }
}
﻿using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.RepairDetail.Commands.CreateRepairDetail;

public class CreateRepairDetailCommandHandler(IMapper mapper,
    IRepairDetailRepository repairDetailRepository,
    IRepairRepository repairRepository) : IRequestHandler<CreateRepairDetailCommand, RepairDetailResponse>
{
    public async Task<RepairDetailResponse> Handle(CreateRepairDetailCommand request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.RepairId, cancellationToken);
        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), request.RepairId.ToString());
        }

        var repairDetail = mapper.Map<GarageFlow.Entities.RepairDetail>(request);

        await repairDetailRepository.CreateRepairDetail(repairDetail, cancellationToken);

        var repairDetailDto = mapper.Map<RepairDetailResponse>(repairDetail);
        return repairDetailDto;
    }
}
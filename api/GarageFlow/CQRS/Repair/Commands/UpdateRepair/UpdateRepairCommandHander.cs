﻿using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairRepository;
using GarageFlow.Services.NotificationService;
using MediatR;

namespace GarageFlow.CQRS.Repair.Commands.UpdateRepair;

public class UpdateRepairCommandHander(IMapper mapper,
    IRepairRepository repairRepository,
    INotificationService notificationService) : IRequestHandler<UpdateRepairCommand>
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

        if (existingRepair.Status != request.Status)
        {
            await notificationService.SendChangeRepairStatusEmail(existingRepair.CustomerEmail, existingRepair.Status);
        }
    }
}
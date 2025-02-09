using AutoMapper;
using GarageFlow.CQRS.RepairHistory;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.RepairHistoryRepository;
using GarageFlow.Repositories.RepairRepository;
using GarageFlow.Services.NotificationService;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.Repair.Commands.UpdateRepair;

public class UpdateRepairCommandHandler(UserManager<AppUser> userManager,
    IMapper mapper,
    IRepairRepository repairRepository,
    ICarRepository carRepository,
    IRepairHistoryRepository repairHistoryRepository,
    INotificationService notificationService) : IRequestHandler<UpdateRepairCommand, RepairResponse>
{
    public async Task<RepairResponse> Handle(UpdateRepairCommand request, CancellationToken cancellationToken)
    {
        var existingRepair = await repairRepository.GetRepairById(request.Id, cancellationToken);

        if (existingRepair == null)
        {
            throw new NotFoundException(nameof(Repair), request.Id.ToString());
        }

        var repair = mapper.Map<GarageFlow.Entities.Repair>(request);

        if (request.CarId != Guid.Empty)
        {
            var car = await carRepository.GetCarById(request.CarId, cancellationToken);

            if (car == null)
            {
                throw new NotFoundException(nameof(Car), request.CarId.ToString());
            }
            else
            {
                repair.CarId = car.Id;
            }
        }
        else
        {
            repair.CarId = null;
        }

        repair.UpdatedAt = DateTime.UtcNow;
        repair.PlannedStartAt = existingRepair.PlannedStartAt;
        repair.PlannedFinishAt = existingRepair.PlannedFinishAt;

        if (request.Users != null)
        {
            List<AppUser> users = new();

            foreach (var userId in request.Users)
            {
                var user = await userManager.FindByIdAsync(userId.ToString());
                users.Add(user);
            }

            repair.Users = users;
        }

        await repairRepository.UpdateRepair(repair, cancellationToken);

        var repairHistoryToCreate = new GarageFlow.Entities.RepairHistory
        {
            RepairId = repair.Id,
            Status = request.Status,
        };

        var currentRepairHistory = await repairHistoryRepository.GetCurrentRepairHistoryByRepairId(repair.Id, cancellationToken);

        await repairHistoryRepository.CreateRepairHistory(repairHistoryToCreate, cancellationToken);

        if (currentRepairHistory.Status != request.Status)
        {
            await notificationService.SendChangeRepairStatusEmail(existingRepair.CustomerEmail, repairHistoryToCreate.Status);
        }

        var repairDto = mapper.Map<RepairResponse>(repair);
        repairDto.RepairHistory = mapper.Map<RepairHistoryResponse>(repairHistoryToCreate);

        return repairDto;
    }
}
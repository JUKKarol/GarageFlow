using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairRepository;
using GarageFlow.Services.NotificationService;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.Repair.Commands.UpdateRepair;

public class UpdateRepairCommandHander(UserManager<AppUser> userManager,
    IMapper mapper,
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
        repair.UpdatedAt = DateTime.UtcNow;

        if (request.Users.Any())
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

        if (existingRepair.Status != request.Status)
        {
            await notificationService.SendChangeRepairStatusEmail(existingRepair.CustomerEmail, existingRepair.Status);
        }
    }
}
using AutoMapper;
using GarageFlow.CQRS.User;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.Repair.Commands.CreateRepair;

public class CreateRepairCommandHandler(IUserContext userContext,
    IUserStore<AppUser> userStore,
    IMapper mapper,
    IRepairRepository repairRepository,
    ICarRepository carRepository,
    UserManager<AppUser> userManager) : IRequestHandler<CreateRepairCommand>
{
    public async Task Handle(CreateRepairCommand request, CancellationToken cancellationToken)
    {
        //var userClaims = userContext.GetCurrentUser();
        //var user = await userManager.FindByEmailAsync(userClaims.Email)
        //    ?? throw new NotFoundException(nameof(AppUser), userClaims.Email);

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

        //repair.Users.Add(user);

        await repairRepository.CreateRepair(repair, cancellationToken);
    }
}
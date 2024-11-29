using AutoMapper;
using MediatR;
using GarageFlow.Entities;
using GarageFlow.Repositories;
using GarageFlow.CQRS.User;
using Microsoft.AspNetCore.Identity;
using GarageFlow.Middlewares.Exceptions;

namespace GarageFlow.CQRS.Repair.Commands.CreateRepair;

public class CreateRepairCommandHandler(IUserContext userContext,
    IUserStore<AppUser> userStore,
    IMapper mapper,
    IRepairRepository repairRepository,
    UserManager<AppUser> userManager) : IRequestHandler<CreateRepairCommand>
{
    public async Task Handle(CreateRepairCommand request, CancellationToken cancellationToken)
    {
        var userClaims = userContext.GetCurrentUser();
        var user = await userManager.FindByEmailAsync(userClaims.Email)
            ?? throw new NotFoundException(nameof(AppUser), userClaims.Email);

        var repair = mapper.Map<GarageFlow.Entities.Repair>(request);
        repair.CustomerId = Guid.Parse(user.Id);

        repair.Users = new List<AppUser>
        {
            user
        };

        await repairRepository.CreateRepair(repair, cancellationToken);
    }
}
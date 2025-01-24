using AutoMapper;
using GarageFlow.CQRS.User;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.RepairDetail.Commands.DeleteRepairDetailById;

public class DeleteRepairDetailByIdCommandHandler(IUserContext userContext,
    IUserStore<AppUser> userStore,
    IMapper mapper,
    IRepairDetailRepository repairDetailRepository,
    IRepairRepository repairRepository,
    ICarRepository carRepository,
    UserManager<AppUser> userManager) : IRequestHandler<DeleteRepairDetailByIdCommand>
{
    public async Task Handle(DeleteRepairDetailByIdCommand request, CancellationToken cancellationToken)
    {
        var existingRepairDetail = await repairDetailRepository.GetRepairDetailById(request.Id, cancellationToken);
        if (existingRepairDetail == null)
        {
            throw new NotFoundException(nameof(RepairDetail), request.Id.ToString());
        }

        await repairDetailRepository.DeleteRepairDetail(request.Id, cancellationToken);
    }
}
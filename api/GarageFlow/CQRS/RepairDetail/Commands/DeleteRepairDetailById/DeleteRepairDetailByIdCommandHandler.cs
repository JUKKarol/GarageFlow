using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairDetailRepository;
using MediatR;

namespace GarageFlow.CQRS.RepairDetail.Commands.DeleteRepairDetailById;

public class DeleteRepairDetailByIdCommandHandler(IRepairDetailRepository repairDetailRepository) : IRequestHandler<DeleteRepairDetailByIdCommand>
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
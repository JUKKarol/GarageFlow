using MediatR;

namespace GarageFlow.CQRS.RepairDetail.Commands.DeleteRepairDetailById;

public class DeleteRepairDetailByIdCommand : IRequest
{
    public Guid Id { get; set; }
}
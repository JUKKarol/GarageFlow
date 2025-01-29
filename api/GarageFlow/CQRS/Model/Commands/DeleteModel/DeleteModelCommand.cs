using GarageFlow.CQRS.RepairDetail;
using MediatR;

namespace GarageFlow.CQRS.Model.Commands.DeleteModel;

public class DeleteModelCommand : IRequest
{
    public Guid Id { get; set; }
}
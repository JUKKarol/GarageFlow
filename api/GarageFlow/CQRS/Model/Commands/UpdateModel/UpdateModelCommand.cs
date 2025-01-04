using MediatR;

namespace GarageFlow.CQRS.Model.Commands.UpdateModel;

public class UpdateModelCommand : IRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
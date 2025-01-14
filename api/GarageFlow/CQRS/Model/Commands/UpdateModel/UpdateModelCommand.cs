using MediatR;

namespace GarageFlow.CQRS.Model.Commands.UpdateModel;

public class UpdateModelCommand : IRequest<ModelResponse>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
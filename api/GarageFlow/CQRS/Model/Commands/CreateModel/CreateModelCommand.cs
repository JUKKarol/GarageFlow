using MediatR;

namespace GarageFlow.CQRS.Model.Commands.CreateModel;

public class CreateModelCommand : IRequest
{
    public Guid BrandId { get; set; }
    public string Name { get; set; }
}
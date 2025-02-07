using MediatR;

namespace GarageFlow.CQRS.Model.Queries.GetModelById;

public class GetModelByIdQuery : IRequest<ModelResponse>
{
    public Guid Id { get; set; }
}
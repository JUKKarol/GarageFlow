using MediatR;

namespace GarageFlow.CQRS.Car.Queries.GetCarById;

public class GetCarByIdQuery : IRequest<CarResponse>
{
    public Guid Id { get; set; }
}
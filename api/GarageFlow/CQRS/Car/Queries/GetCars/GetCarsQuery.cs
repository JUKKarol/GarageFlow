using MediatR;
using Sieve.Models;

namespace GarageFlow.CQRS.Car.Queries.GetCars;

public class GetCarsQuery : IRequest<RespondListDto<CarResponse>>
{
    public SieveModel Query { get; set; }
}
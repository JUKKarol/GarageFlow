using GarageFlow.CQRS.Brands;
using MediatR;
using Sieve.Models;

namespace GarageFlow.CQRS.Car.Query.GetCars;

public class GetCarsQuery : IRequest<RespondListDto<CarResponse>>
{
    public SieveModel Query { get; set; }
}
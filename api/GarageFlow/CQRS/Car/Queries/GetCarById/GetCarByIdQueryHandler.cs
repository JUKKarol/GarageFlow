using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using MediatR;

namespace GarageFlow.CQRS.Car.Queries.GetCarById;

public class GetCarByIdQueryHandler(IMapper mapper,
    ICarRepository carRepository) : IRequestHandler<GetCarByIdQuery, CarResponse>
{
    public async Task<CarResponse> Handle(GetCarByIdQuery request, CancellationToken cancellationToken)
    {
        var car = await carRepository.GetCarById(request.Id, cancellationToken);
        if (car == null)
        {
            throw new NotFoundException(nameof(Car), request.Id.ToString());
        }

        return mapper.Map<CarResponse>(car);
    }
}
using AutoMapper;
using GarageFlow.CQRS.Car;
using GarageFlow.CQRS.Car.Query.GetCars;
using GarageFlow.Repositories.CarRepository;
using MediatR;

namespace GarageFlow.CQRS.Cars.Queries.GetCars;

public class GetCarsQueryHandler(IMapper mapper,
    ICarRepository carRepository) : IRequestHandler<GetCarsQuery, RespondListDto<CarResponse>>
{
    public async Task<RespondListDto<CarResponse>> Handle(GetCarsQuery request, CancellationToken cancellationToken)
    {
        int pageSize = request.Query.PageSize != null ? (int)request.Query.PageSize : 40;

        var cars = await carRepository.GetAllCars(request.Query, cancellationToken);
        var carsDto = mapper.Map<List<CarResponse>>(cars);

        RespondListDto<CarResponse> respondListDto = new();
        respondListDto.Items = carsDto;
        respondListDto.ItemsCount = await carRepository.GetCarsCount(request.Query, cancellationToken);
        respondListDto.PagesCount = (int)Math.Ceiling((double)respondListDto.ItemsCount / pageSize);

        return respondListDto;
    }
}
using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Car.Command.UpdateCar;

public class UpdateCarCommandHandler(IMapper mapper,
    ICarRepository carRepository,
    IModelRepository modelRepository) : IRequestHandler<UpdateCarCommand, CarResponse>
{
    public async Task<CarResponse> Handle(UpdateCarCommand request, CancellationToken cancellationToken)
    {
        var existingCar = await carRepository.GetCarById(request.Id, cancellationToken);
        if (existingCar == null)
        {
            throw new NotFoundException(nameof(Car), request.Id.ToString());
        }

        var model = await modelRepository.GetModelById(request.ModelId, cancellationToken);
        if (model == null)
        {
            throw new NotFoundException(nameof(Model), request.ModelId.ToString());
        }

        var car = mapper.Map<GarageFlow.Entities.Car>(request);
        car.UpdatedAt = DateTime.UtcNow;
        car.ModelId = model.Id;

        await carRepository.UpdateCar(car, cancellationToken);

        var carDto = mapper.Map<CarResponse>(car);
        return carDto;
    }
}
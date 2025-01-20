using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Car.Command.CreateCar;

public class CreateCarCommandHandler(IMapper mapper,
    ICarRepository carRepository,
    IModelRepository modelRepository) : IRequestHandler<CreateCarCommand, CarResponse>
{
    public async Task<CarResponse> Handle(CreateCarCommand request, CancellationToken cancellationToken)
    {
        var model = await modelRepository.GetModelById(request.ModelId, cancellationToken);
        if (model == null)
        {
            throw new NotFoundException(nameof(Model), request.ModelId.ToString());
        }

        var existingCarByVin = await carRepository.GetCarByVin(request.Vin, cancellationToken);
        if (existingCarByVin != null)
        {
            throw new ConflictException($"Car with VIN {request.Vin} already exists");
        }

        var car = mapper.Map<GarageFlow.Entities.Car>(request);
        await modelRepository.CreateModel(model, cancellationToken);

        var carDto = mapper.Map<CarResponse>(car);
        return carDto;
    }
}
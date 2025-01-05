using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Car.Command.CreateCar;

public class CreateCarCommandHandler(IMapper mapper,
    ICarRepository carRepository,
    IModelRepository modelRepository) : IRequestHandler<CreateCarCommand>
{
    public async Task Handle(CreateCarCommand request, CancellationToken cancellationToken)
    {
        var model = await modelRepository.GetModelById(request.ModelId, cancellationToken);
        if (model == null)
        {
            throw new NotFoundException(nameof(Model), request.ModelId.ToString());
        }

        var car = mapper.Map<GarageFlow.Entities.Car>(request);
        await modelRepository.CreateModel(model, cancellationToken);
    }
}
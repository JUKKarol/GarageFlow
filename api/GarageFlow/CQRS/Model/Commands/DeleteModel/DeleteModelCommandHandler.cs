using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.CarRepository;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Model.Commands.DeleteModel;

public class DeleteModelCommandHandler(IModelRepository modelRepository, ICarRepository carRepository) : IRequestHandler<DeleteModelCommand>
{
    public async Task Handle(DeleteModelCommand request, CancellationToken cancellationToken)
    {
        var existingModel = await modelRepository.GetModelById(request.Id, cancellationToken);
        if (existingModel == null)
        {
            throw new NotFoundException(nameof(GarageFlow.Entities.Model), request.Id.ToString());
        }

        //await carRepository.SetCarModelIdAsNullByModelId(existingModel.Id, cancellationToken);

        await modelRepository.DeleteModel(existingModel.Id, cancellationToken);
    }
}
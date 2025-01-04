using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Model.Commands.UpdateModel;

public class UpdateModelCommandHandler(IModelRepository modelRepository,
    IMapper mapper) : IRequestHandler<UpdateModelCommand>
{
    public async Task Handle(UpdateModelCommand request, CancellationToken cancellationToken)
    {
        var existingModel = await modelRepository.GetModelById(request.Id, cancellationToken);

        if (existingModel == null)
        {
            throw new NotFoundException(nameof(GarageFlow.Entities.Model), request.Id.ToString());
        }

        var model = mapper.Map<GarageFlow.Entities.Model>(request);
        model.BrandId = existingModel.BrandId;
        model.UpdatedAt = DateTime.UtcNow;

        await modelRepository.UpdateModel(model, cancellationToken);
    }
}
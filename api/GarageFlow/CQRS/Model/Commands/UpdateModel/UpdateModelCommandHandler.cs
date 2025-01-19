using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Model.Commands.UpdateModel;

public class UpdateModelCommandHandler(IModelRepository modelRepository,
    IMapper mapper) : IRequestHandler<UpdateModelCommand, ModelResponse>
{
    public async Task<ModelResponse> Handle(UpdateModelCommand request, CancellationToken cancellationToken)
    {
        var existingModel = await modelRepository.GetModelById(request.Id, cancellationToken);

        if (existingModel == null)
        {
            throw new NotFoundException(nameof(GarageFlow.Entities.Model), request.Id.ToString());
        }

        var modelByName = await modelRepository.GetModelsByName(request.Name, cancellationToken);
        if (modelByName.Any(m => m.BrandId == existingModel.BrandId && m.Id != request.Id))
        {
            throw new ConflictException($"A model with the name '{request.Name}' already exists in the brand.");
        }

        var model = mapper.Map<GarageFlow.Entities.Model>(request);
        model.BrandId = existingModel.BrandId;
        model.UpdatedAt = DateTime.UtcNow;

        await modelRepository.UpdateModel(model, cancellationToken);

        var modelDto = mapper.Map<ModelResponse>(model);
        return modelDto;
    }
}
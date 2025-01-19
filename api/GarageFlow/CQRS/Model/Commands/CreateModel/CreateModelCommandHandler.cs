using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.BrandRepository;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Model.Commands.CreateModel;

public class CreateModelCommandHandler(IModelRepository modelRepository,
    IBrandRepository brandRepository,
    IMapper mapper) : IRequestHandler<CreateModelCommand, ModelResponse>
{
    public async Task<ModelResponse> Handle(CreateModelCommand request, CancellationToken cancellationToken)
    {
        var brandById = await brandRepository.GetBrandById(request.BrandId, cancellationToken);
        if (brandById == null)
        {
            throw new NotFoundException(nameof(Brand), request.BrandId.ToString());
        }

        var modelByName = await modelRepository.GetModelsByName(request.Name, cancellationToken);
        if (modelByName != null && modelByName.Any(m => m.BrandId == request.BrandId))
        {
            throw new ConflictException($"Model with name '{request.Name}' already exists for the brand.");
        }

        var model = mapper.Map<GarageFlow.Entities.Model>(request);
        await modelRepository.CreateModel(model, cancellationToken);

        var modelDto = mapper.Map<ModelResponse>(model);
        return modelDto;
    }
}
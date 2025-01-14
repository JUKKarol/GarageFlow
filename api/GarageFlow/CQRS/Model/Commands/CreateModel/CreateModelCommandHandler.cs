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
        var brand = await brandRepository.GetBrandById(request.BrandId, cancellationToken);
        if (brand == null)
        {
            throw new NotFoundException(nameof(Brand), request.BrandId.ToString());
        }

        var model = mapper.Map<GarageFlow.Entities.Model>(request);
        await modelRepository.CreateModel(model, cancellationToken);

        var modelDto = mapper.Map<ModelResponse>(model);
        return modelDto;
    }
}
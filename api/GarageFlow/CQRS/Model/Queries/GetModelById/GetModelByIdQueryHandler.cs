using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Model.Queries.GetModelById;

public class GetModelByIdQueryHandler(IMapper mapper,
    IModelRepository modelRepository) : IRequestHandler<GetModelByIdQuery, ModelResponse>
{
    public async Task<ModelResponse> Handle(GetModelByIdQuery request, CancellationToken cancellationToken)
    {
        var model = await modelRepository.GetModelById(request.Id, cancellationToken);
        if (model == null)
        {
            throw new NotFoundException(nameof(Model), request.Id.ToString());
        }

        return mapper.Map<ModelResponse>(model);
    }
}
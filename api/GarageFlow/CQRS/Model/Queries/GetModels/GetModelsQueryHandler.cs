using AutoMapper;
using GarageFlow.Repositories.ModelRepository;
using MediatR;

namespace GarageFlow.CQRS.Model.Queries.GetModels;

public class GetModelsQueryHandler(IMapper mapper,
    IModelRepository modelRepository) : IRequestHandler<GetModelsQuery, RespondListDto<ModelResponse>>
{
    public async Task<RespondListDto<ModelResponse>> Handle(GetModelsQuery request, CancellationToken cancellationToken)
    {
        int pageSize = request.Query.PageSize != null ? (int)request.Query.PageSize : 40;

        var models = await modelRepository.GetAllModels(request.Query, cancellationToken);
        var modelsDto = mapper.Map<List<ModelResponse>>(models);

        RespondListDto<ModelResponse> respondListDto = new();
        respondListDto.Items = modelsDto;
        respondListDto.ItemsCount = await modelRepository.GetModelsCount(request.Query, cancellationToken);
        respondListDto.PagesCount = (int)Math.Ceiling((double)respondListDto.ItemsCount / pageSize);

        return respondListDto;
    }
}
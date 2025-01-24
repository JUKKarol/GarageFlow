using AutoMapper;
using GarageFlow.Repositories.BrandRepository;
using MediatR;

namespace GarageFlow.CQRS.Brands.Queries.GetBrands;

public class GetBrandsQueryHandler(IMapper mapper,
    IBrandRepository brandRepository) : IRequestHandler<GetBrandsQuery, RespondListDto<BrandResponse>>
{
    public async Task<RespondListDto<BrandResponse>> Handle(GetBrandsQuery request, CancellationToken cancellationToken)
    {
        int pageSize = request.Query.PageSize != null ? (int)request.Query.PageSize : 40;

        var brands = await brandRepository.GetAllBrands(request.Query, cancellationToken);
        var brandsDto = mapper.Map<List<BrandResponse>>(brands);

        RespondListDto<BrandResponse> respondListDto = new();
        respondListDto.Items = brandsDto;
        respondListDto.ItemsCount = await brandRepository.GetBrandsCount(request.Query, cancellationToken);
        respondListDto.PagesCount = (int)Math.Ceiling((double)respondListDto.ItemsCount / pageSize);

        return respondListDto;
    }
}
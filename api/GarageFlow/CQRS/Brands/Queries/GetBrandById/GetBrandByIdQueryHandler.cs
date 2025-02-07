using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.BrandRepository;
using MediatR;

namespace GarageFlow.CQRS.Brands.Queries.GetBrandById;

public class GetBrandByIdQueryHandler(IMapper mapper,
    IBrandRepository brandRepository) : IRequestHandler<GetBrandByIdQuery, BrandResponse>
{
    public async Task<BrandResponse> Handle(GetBrandByIdQuery request, CancellationToken cancellationToken)
    {
        var brand = await brandRepository.GetBrandById(request.Id, cancellationToken);
        if (brand == null)
        {
            throw new NotFoundException(nameof(Brand), request.Id.ToString());
        }

        return mapper.Map<BrandResponse>(brand);
    }
}
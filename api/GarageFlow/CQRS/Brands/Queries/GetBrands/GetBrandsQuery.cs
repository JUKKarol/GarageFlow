using MediatR;
using Sieve.Models;

namespace GarageFlow.CQRS.Brands.Queries.GetBrands;

public class GetBrandsQuery : IRequest<RespondListDto<BrandResponse>>
{
    public SieveModel Query { get; set; }
}
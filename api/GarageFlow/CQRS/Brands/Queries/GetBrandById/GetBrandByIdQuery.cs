using MediatR;

namespace GarageFlow.CQRS.Brands.Queries.GetBrandById;

public class GetBrandByIdQuery : IRequest<BrandResponse>
{
    public Guid Id { get; set; }
}
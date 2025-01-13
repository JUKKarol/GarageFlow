using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.UpdateBrand;

public class UpdateBrandCommand : IRequest<BrandResponse>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
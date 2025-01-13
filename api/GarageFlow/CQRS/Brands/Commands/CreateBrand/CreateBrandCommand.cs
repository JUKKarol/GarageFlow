using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.CreateBrand;

public class CreateBrandCommand : IRequest<BrandResponse>
{
    public string Name { get; set; }
}
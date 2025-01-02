using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.CreateBrand;

public class CreateBrandCommand : IRequest
{
    public string Name { get; set; }
}
using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.UpdateBrand;

public class UpdateBrandCommand : IRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
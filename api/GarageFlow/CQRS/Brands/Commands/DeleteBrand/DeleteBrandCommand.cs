using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.DeleteBrand;

public class DeleteBrandCommand : IRequest
{
    public Guid Id { get; set; }
}
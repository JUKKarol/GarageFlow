using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.BrandRepository;
using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.DeleteBrand;

public class DeleteBrandCommandHandler(IBrandRepository brandRepository) : IRequestHandler<DeleteBrandCommand>
{
    public async Task Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
    {
        var existingBrand = await brandRepository.GetBrandById(request.Id, cancellationToken);
        if (existingBrand == null)
        {
            throw new NotFoundException(nameof(GarageFlow.Entities.Brand), request.Id.ToString());
        }

        await brandRepository.DeleteBrand(existingBrand.Id, cancellationToken);
    }
}
using AutoMapper;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.BrandRepository;
using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.UpdateBrand;

public class UpdateBrandCommandHandler(IMapper mapper,
    IBrandRepository brandRepository) : IRequestHandler<UpdateBrandCommand>
{
    public async Task Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
    {
        var existingBrand = await brandRepository.GetBrandById(request.Id, cancellationToken);

        if (existingBrand == null)
        {
            throw new NotFoundException(nameof(Repair), request.Id.ToString());
        }

        var brand = mapper.Map<GarageFlow.Entities.Brand>(request);
        brand.UpdatedAt = DateTime.UtcNow;

        await brandRepository.UpdateBrand(brand, cancellationToken);
    }
}
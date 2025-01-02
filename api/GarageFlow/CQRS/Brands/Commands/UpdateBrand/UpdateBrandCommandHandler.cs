using AutoMapper;
using GarageFlow.CQRS.Brands.Commands.CreateBrand;
using GarageFlow.CQRS.Repair.Commands.UpdateRepair;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.BrandRepository;
using GarageFlow.Repositories.RepairRepository;
using GarageFlow.Services.NotificationService;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.Brands.Commands.UpdateBrand;

public class UpdateBrandCommandHandler(UserManager<AppUser> userManager,
    IMapper mapper,
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

        await brandRepository.UpdateBrand(brand, cancellationToken);
    }
}
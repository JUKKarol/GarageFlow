using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Repositories.BrandRepository;
using GarageFlow.Repositories.RepairRepository;
using GarageFlow.Services.NotificationService;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.Brands.Commands.CreateBrand;

public class CreateBrandCommandHandler(UserManager<AppUser> userManager,
    IMapper mapper,
    IBrandRepository brandRepository) : IRequestHandler<CreateBrandCommand>
{
    public async Task Handle(CreateBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = mapper.Map<GarageFlow.Entities.Brand>(request);
        await brandRepository.CreateBrand(brand, cancellationToken);
    }
}
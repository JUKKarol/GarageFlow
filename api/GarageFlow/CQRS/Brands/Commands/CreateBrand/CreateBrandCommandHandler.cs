using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Repositories.BrandRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace GarageFlow.CQRS.Brands.Commands.CreateBrand;

public class CreateBrandCommandHandler(UserManager<AppUser> userManager,
    IMapper mapper,
    IBrandRepository brandRepository) : IRequestHandler<CreateBrandCommand, BrandResponse>
{
    public async Task<BrandResponse> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = mapper.Map<GarageFlow.Entities.Brand>(request);
        await brandRepository.CreateBrand(brand, cancellationToken);

        var brandDto = mapper.Map<BrandResponse>(brand);
        return brandDto;
    }
}
using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
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
        var existingBrand = await brandRepository.GetBrandsByName(request.Name, cancellationToken);
        if (existingBrand != null)
        {
            throw new ConflictException($"Brand {request.Name} already exists");
        }

        var brand = mapper.Map<GarageFlow.Entities.Brand>(request);
        await brandRepository.CreateBrand(brand, cancellationToken);

        var brandDto = mapper.Map<BrandResponse>(brand);
        return brandDto;
    }
}
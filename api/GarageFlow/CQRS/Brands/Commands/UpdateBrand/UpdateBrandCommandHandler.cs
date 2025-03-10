﻿using AutoMapper;
using GarageFlow.Entities;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.BrandRepository;
using MediatR;

namespace GarageFlow.CQRS.Brands.Commands.UpdateBrand;

public class UpdateBrandCommandHandler(IMapper mapper,
    IBrandRepository brandRepository) : IRequestHandler<UpdateBrandCommand, BrandResponse>
{
    public async Task<BrandResponse> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
    {
        var existingBrandById = await brandRepository.GetBrandById(request.Id, cancellationToken);

        if (existingBrandById == null)
        {
            throw new NotFoundException(nameof(Brand), request.Id.ToString());
        }

        var existingBrandsByName = await brandRepository.GetBrandsByName(request.Name, cancellationToken);
        if (existingBrandsByName.Any(b => b.Id != request.Id))
        {
            throw new ConflictException($"Brand {request.Name} already exists");
        }

        var brand = mapper.Map<GarageFlow.Entities.Brand>(request);
        brand.UpdatedAt = DateTime.UtcNow;

        await brandRepository.UpdateBrand(brand, cancellationToken);

        var brandDto = mapper.Map<BrandResponse>(brand);
        return brandDto;
    }
}
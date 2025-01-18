using GarageFlow.Data;
using GarageFlow.Entities;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace GarageFlow.Repositories.BrandRepository;

public class BrandRepository(AppDbContext db,
    ISieveProcessor sieveProcessor) : IBrandRepository
{
    public async Task<Brand> CreateBrand(Brand brand, CancellationToken cancellationToken)
    {
        await db.Brands.AddAsync(brand, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return brand;
    }

    public async Task<Brand> UpdateBrand(Brand brand, CancellationToken cancellationToken)
    {
        db.Brands.Update(brand);
        await db.SaveChangesAsync(cancellationToken);
        return brand;
    }

    public async Task<List<Brand>> GetAllBrands(SieveModel query, CancellationToken cancellationToken)
    {
        var brand = db
            .Brands
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, brand)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetBrandsCount(SieveModel query, CancellationToken cancellationToken)
    {
        var brands = db
            .Brands
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, brands, applyPagination: false)
            .CountAsync(cancellationToken);
    }

    public async Task<Brand> GetBrandById(Guid brandId, CancellationToken cancellationToken)
    {
        return await db.Brands.AsNoTracking().FirstOrDefaultAsync(b => b.Id == brandId, cancellationToken);
    }

    public async Task<Brand> GetBrandByName(string brandName, CancellationToken cancellationToken)
    {
        return await db.Brands.AsNoTracking().FirstOrDefaultAsync(b => b.Name.ToLower() == brandName.ToLower(), cancellationToken);
    }
}
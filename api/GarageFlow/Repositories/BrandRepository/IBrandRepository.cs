using GarageFlow.Entities;
using Sieve.Models;

namespace GarageFlow.Repositories.BrandRepository;

public interface IBrandRepository
{
    Task<Brand> CreateBrand(Brand brand, CancellationToken cancellationToken);

    Task<Brand> UpdateBrand(Brand brand, CancellationToken cancellationToken);

    Task<List<Brand>> GetAllBrands(SieveModel query, CancellationToken cancellationToken);

    Task<int> GetBrandsCount(SieveModel query, CancellationToken cancellationToken);

    Task<Brand> GetBrandById(Guid brandId, CancellationToken cancellationToken);
}
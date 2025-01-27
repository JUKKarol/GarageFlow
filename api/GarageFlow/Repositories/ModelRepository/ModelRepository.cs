using GarageFlow.Data;
using GarageFlow.Entities;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace GarageFlow.Repositories.ModelRepository;

public class ModelRepository(AppDbContext db,
    ISieveProcessor sieveProcessor) : IModelRepository
{
    public async Task<Model> CreateModel(Model model, CancellationToken cancellationToken)
    {
        await db.Models.AddAsync(model, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return model;
    }

    public async Task<Model> UpdateModel(Model model, CancellationToken cancellationToken)
    {
        db.Models.Update(model);
        await db.SaveChangesAsync(cancellationToken);
        return model;
    }

    public async Task<List<Model>> GetAllModels(SieveModel query, CancellationToken cancellationToken)
    {
        var model = db
            .Models
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, model)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetModelsCount(SieveModel query, CancellationToken cancellationToken)
    {
        var models = db
            .Models
            .AsNoTracking()
            .AsQueryable();

        return await sieveProcessor
            .Apply(query, models, applyPagination: false)
            .CountAsync(cancellationToken);
    }

    public async Task<Model> GetModelById(Guid modelId, CancellationToken cancellationToken)
    {
        return await db.Models.AsNoTracking().FirstOrDefaultAsync(b => b.Id == modelId, cancellationToken);
    }

    public async Task<List<Model>> GetModelsByName(string modelName, CancellationToken cancellationToken)
    {
        return await db.Models
            .AsNoTracking()
            .Where(m => m.Name.ToLower() == modelName.ToLower())
            .ToListAsync(cancellationToken);
    }
}
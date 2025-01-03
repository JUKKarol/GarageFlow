using GarageFlow.Entities;
using Sieve.Models;

namespace GarageFlow.Repositories.ModelRepository;

public interface IModelRepository
{
    Task<Model> CreateModel(Model model, CancellationToken cancellationToken);

    Task<Model> UpdateModel(Model model, CancellationToken cancellationToken);

    Task<List<Model>> GetAllModels(SieveModel query, CancellationToken cancellationToken);

    Task<int> GetModelsCount(SieveModel query, CancellationToken cancellationToken);

    Task<Model> GetModelById(Guid modelId, CancellationToken cancellationToken);
}
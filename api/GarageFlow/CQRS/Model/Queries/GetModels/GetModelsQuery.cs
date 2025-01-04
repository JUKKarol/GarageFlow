using MediatR;
using Sieve.Models;

namespace GarageFlow.CQRS.Model.Queries.GetModels;

public class GetModelsQuery : IRequest<RespondListDto<ModelResponse>>
{
    public SieveModel Query { get; set; }
}
using AutoMapper;
using GarageFlow.CQRS.RepairHistory;
using GarageFlow.Repositories.RepairRepository;
using MediatR;

namespace GarageFlow.CQRS.Repair.Queries.GetRepairsByStatus;

public class GetRepairsQueryHandler(IMapper mapper,
    IRepairRepository repairRepository) : IRequestHandler<GetRepairsQuery, RespondListDto<RepairResponse>>
{
    public async Task<RespondListDto<RepairResponse>> Handle(GetRepairsQuery request, CancellationToken cancellationToken)
    {
        int pageSize = request.Query.PageSize != null ? (int)request.Query.PageSize : 40;

        var repairs = await repairRepository.GetAllRepairs(request.Query, cancellationToken);
        var repairsDto = mapper.Map<List<RepairResponse>>(repairs);
        foreach (var repair in repairsDto)
        {
        }

        RespondListDto<RepairResponse> respondListDto = new();
        respondListDto.Items = repairsDto;
        respondListDto.ItemsCount = await repairRepository.GetRepairsCount(request.Query, cancellationToken);
        respondListDto.PagesCount = (int)Math.Ceiling((double)respondListDto.ItemsCount / pageSize);

        return respondListDto;
    }
}
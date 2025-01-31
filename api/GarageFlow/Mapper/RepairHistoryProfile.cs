using AutoMapper;
using GarageFlow.CQRS.RepairHistory;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class RepairHistoryProfile : Profile
{
    public RepairHistoryProfile()
    {
        CreateMap<RepairHistory, RepairHistoryResponse>().ReverseMap();
    }
}
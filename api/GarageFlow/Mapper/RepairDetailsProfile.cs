using AutoMapper;
using GarageFlow.CQRS.RepairDetail;
using GarageFlow.CQRS.RepairDetail.Commands.CreateRepairDetail;
using GarageFlow.CQRS.RepairDetail.Commands.UpdateRepairDetail;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class RepairDetailsProfile : Profile
{
    public RepairDetailsProfile()
    {
        CreateMap<RepairDetail, RepairDetailResponse>().ReverseMap();
        CreateMap<RepairDetail, CreateRepairDetailCommand>().ReverseMap();
        CreateMap<RepairDetail, UpdateRepairDetailCommand>().ReverseMap();
        CreateMap<RepairDetail, RepairDetailResponse>().ReverseMap();
    }
}
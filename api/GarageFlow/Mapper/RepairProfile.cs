using AutoMapper;
using GarageFlow.CQRS.Repair.Commands.CreateRepair;
using GarageFlow.CQRS.Repair.Commands.UpdateRepair;
using GarageFlow.CQRS.Repair.Queries;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class RepairProfile : Profile
{
    public RepairProfile()
    {
        CreateMap<CreateRepairCommand, Repair>();
        CreateMap<UpdateRepairCommand, Repair>();
        CreateMap<RepairResponse, Repair>().ReverseMap();
    }
}
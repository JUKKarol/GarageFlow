using AutoMapper;
using GarageFlow.CQRS.Repair.Commands.CreateRepair;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class RepairProfile : Profile
{
    public RepairProfile()
    {
        CreateMap<CreateRepairCommand, Repair>();
    }
}
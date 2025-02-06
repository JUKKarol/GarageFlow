using AutoMapper;
using GarageFlow.CQRS.Repair;
using GarageFlow.CQRS.Repair.Commands.CreateRepair;
using GarageFlow.CQRS.Repair.Commands.UpdateRepair;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class RepairProfile : Profile
{
    public RepairProfile()
    {
        CreateMap<CreateRepairCommand, Repair>().ReverseMap();
        CreateMap<UpdateRepairCommand, Repair>()
            .ForMember(dest => dest.Users, opt => opt.Ignore());
        CreateMap<RepairResponse, Repair>().ReverseMap();
        CreateMap<RepairWithDetailsResponse, Repair>().ReverseMap();
        CreateMap<InvoiceResponse, Repair>().ReverseMap();
    }
}
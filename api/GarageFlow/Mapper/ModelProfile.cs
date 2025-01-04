using AutoMapper;
using GarageFlow.CQRS.Model;
using GarageFlow.CQRS.Model.Commands.CreateModel;
using GarageFlow.CQRS.Model.Commands.UpdateModel;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class ModelProfile : Profile
{
    public ModelProfile()
    {
        CreateMap<CreateModelCommand, Model>().ReverseMap();
        CreateMap<UpdateModelCommand, Model>().ReverseMap();
        CreateMap<ModelResponse, Model>().ReverseMap();
    }
}
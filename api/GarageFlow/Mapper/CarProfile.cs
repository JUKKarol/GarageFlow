using AutoMapper;
using GarageFlow.CQRS.Car;
using GarageFlow.CQRS.Car.Command.CreateCar;
using GarageFlow.CQRS.Car.Command.UpdateCar;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class CarProfile : Profile
{
    public CarProfile()
    {
        CreateMap<CreateCarCommand, Car>().ReverseMap();
        CreateMap<UpdateCarCommand, Car>().ReverseMap();
        CreateMap<CarResponse, Car>().ReverseMap();
    }
}
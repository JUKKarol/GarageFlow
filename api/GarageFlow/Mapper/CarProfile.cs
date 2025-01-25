using AutoMapper;
using GarageFlow.CQRS.Car;
using GarageFlow.CQRS.Car.Commands.CreateCar;
using GarageFlow.CQRS.Car.Commands.UpdateCar;
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
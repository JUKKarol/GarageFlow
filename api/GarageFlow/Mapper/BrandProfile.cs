using AutoMapper;
using GarageFlow.CQRS.Brands;
using GarageFlow.CQRS.Brands.Commands.CreateBrand;
using GarageFlow.CQRS.Brands.Commands.UpdateBrand;
using GarageFlow.Entities;

namespace GarageFlow.Mapper;

public class BrandProfile : Profile
{
    public BrandProfile()
    {
        CreateMap<CreateBrandCommand, Brand>().ReverseMap();
        CreateMap<UpdateBrandCommand, Brand>().ReverseMap();
        CreateMap<BrandResponse, Brand>().ReverseMap();
    }
}
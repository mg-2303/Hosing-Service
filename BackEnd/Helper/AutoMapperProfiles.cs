using AutoMapper;
using BackEnd.Controllers;
using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Helper
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {                              // two way binding                     
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();
        }
    }
}

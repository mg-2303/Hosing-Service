using AutoMapper;
using BackEnd.Dtos;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : Controller
    {
        private readonly IUnitOfWork uow;

        public IMapper mapper;
        private object throws;

        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            throw new UnauthorizedAccessException();
            var cities= await uow.CityRepository.GetCitiesAsync();
            /*var cityDtos = from c in cities
                           select new CityDto
                           {
                               Id = c.Id,
                               Name = c.Name,
                           };*/                  // source  //destination                               
            var cityDtos = mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(cityDtos);
        }

        //post api/city/add?city=Miami
        [HttpPost("add/{cityName}")] // string params
        //[HttpPost("add")]
        public async Task<IActionResult> AddCity(string cityName)
        {
            City city = new City();
            city.Name = cityName;
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpPost("post")] // json format
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            /* City city = new City
            {
                Name = cityDto.Name,
                LastUpdatedBy = 1,
                LastUpdatedOn = DateTime.Now
            };*/
            //city.Name = cityDto.Name;
          
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/v1/{id}")] // json format
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            if (id != cityDto.Id)
            {
                return BadRequest("Updation is not allowed");
            }
            if (cityFromDb == null)
            {
                return BadRequest("Updation is not allowed");
            }
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            throw new Exception();
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("update/v2/{id}")] // json format
        public async Task<IActionResult> UpdateCity2(int id, CityUpdateDto cityDto)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPatch("update/{id}")] // json format
        public async Task<IActionResult> UpdateCityPatch(int id,JsonPatchDocument<City> cityToPatch)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            cityToPatch.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200); 
        }

        [HttpDelete("delete/{id}")] // json format
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpGet("{id}")]
        public string GetById(int id)
        {
            return "Atlanta";
        }
    }
}

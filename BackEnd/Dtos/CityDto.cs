using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage = "Name is mandatory field")]
        [StringLength (50,MinimumLength =2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Country is mandatory field")]
        [StringLength(50, MinimumLength = 2)]
        public string Country { get; set; }
    }
}

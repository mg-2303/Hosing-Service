using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class City
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Country { get; set; }
        public DateTime LastUpdatedOn { get; set; }= DateTime.Now;
        public int LastUpdatedBy { get; set; }
    }
}

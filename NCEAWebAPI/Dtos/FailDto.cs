using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Dtos
{
    public class FailDto
    {
        [Required]
        public string fail { get; set; }
    }
}

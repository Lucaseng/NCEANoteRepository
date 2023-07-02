using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Dtos
{
    public class KudosInputDto
    {
        [Required]
        public int User_ID { get; set; }

        [Required]
        public int Note_ID { get; set; }
    }
}

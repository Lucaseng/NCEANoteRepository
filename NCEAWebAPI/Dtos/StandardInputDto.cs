using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Dtos
{
    public class StandardInputDto
    {
        [Required]
        public int Standard_ID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Credits { get; set; }

        [Required] public string Assessment { get; set; }

        [Required] public string Level { get; set; }

        [Required] public int Subject_ID { get; set; }
    }
}

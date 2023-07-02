using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Dtos
{
    public class NoteInputDto
    {

        [Required]
        public int Standard_ID { get; set; }

        [Required]
        public int User_ID { get; set; }

        [Required]
        public string File { get; set; }

        [Required]
        public string File_Name { get; set; }
    }
}

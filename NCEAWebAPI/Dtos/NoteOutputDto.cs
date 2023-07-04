using NCEAWebRepo.Models;

namespace NCEAWebRepo.Dtos
{
    public class NoteOutputDto
    {
        public int Note_ID { get; set; }
        public string File { get; set; }
        public string File_Name { get; set; }

        public int Kudos { get; set; }

        public Standard Standard { get; set; }

        public UserOutputDto User { get; set; }

    }
}

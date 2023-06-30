
using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Models
{
    public class Note
    {
        [Key]
        public int Note_ID { get; set; }
        public Standard Standard { get; set; }
        public User User { get; set; }
        public string File { get; set; }
    }
}

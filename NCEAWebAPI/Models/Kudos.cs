
using System.ComponentModel.DataAnnotations;


namespace NCEAWebRepo.Models
{
    public class Kudos
    {
        [Key]
        public int Kudos_ID { get; set; }
        public User User { get; set; }
        public Note Note { get; set; }
    }
}

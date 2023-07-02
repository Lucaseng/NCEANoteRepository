
using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Models
{
    public class Standard
    {
        [Key]
        public int Standard_ID { get; set; }
        public string Title { get; set; }

        public string Credits { get; set; }

        public string Assessment { get; set; }

        public string Level { get; set; }
        public Subject Subject { get; set; }

    }
}

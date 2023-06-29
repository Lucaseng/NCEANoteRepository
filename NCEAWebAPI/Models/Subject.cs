
using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Models
{
    public class Subject
    {
        [Key]
        public int Subject_ID { get; set; }
        public string Subject_name { get; set; }

    }
}

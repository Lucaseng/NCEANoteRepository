using System.ComponentModel.DataAnnotations;

namespace NCEAWebRepo.Models

{
    public class User
    {

        [Key]
        public int User_ID { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public string School { get; set; }

        public string User_Type { get; set; }

    }



}

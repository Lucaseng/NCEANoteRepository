using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Auth
{
    public interface IAuthRepo
    {
        public bool ValidLogin(string Email, string Password);

        public bool ValidAdmin(string Email, string Password);

        public User Login(LoginInput cred);



    }
}

using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Auth
{
    public class AuthRepo : IAuthRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;

        public AuthRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User Login(LoginInput cred)
        {
            User c = _dbContext.User.FirstOrDefault(u => u.Email == cred.email);
            if (c != null)
            {
                if (BCrypt.Net.BCrypt.Verify(cred.password, c.Password))
                {
                    return c;
                }
            }
            return null;
        }

        public bool ValidLogin(string email, string password)
        {
            User c = _dbContext.User.FirstOrDefault(u => u.Email == email);
            if (c == null)
                return false;
            else
            {
                return BCrypt.Net.BCrypt.Verify(password, c.Password);
            }

        }

        public bool ValidAdmin(string email, string password)
        {
            User c = _dbContext.User.FirstOrDefault(u => u.Email == email && u.Password == password);
            if (c == null)
                return false;
            else
            {
                return c.User_Type == "Admin";
            }
        }

    }
}

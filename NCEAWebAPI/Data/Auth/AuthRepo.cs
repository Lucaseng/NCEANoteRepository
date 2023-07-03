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

        public bool ValidLogin(string email, string password)
        {
            User c = _dbContext.User.FirstOrDefault(u => u.Email == email && u.Password == password);
            if (c == null)
                return false;
            else
                return true;
        }

    }
}

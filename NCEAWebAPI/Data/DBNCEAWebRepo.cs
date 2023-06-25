using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data
{
    public class DBNCEAWebRepo : INCEAWebRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public DBNCEAWebRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _dbContext.User.ToList<User>();
            return users;
        }


    }
}

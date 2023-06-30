using Microsoft.EntityFrameworkCore.ChangeTracking;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Users
{
    public class UserRepo : IUserRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public UserRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _dbContext.User.ToList();
            return users;
        }

        public IEnumerable<UserOutputDto> GetModifiedUsers()
        {
            IEnumerable<User> users = GetUsers();
            var res = users.Select(a => new UserOutputDto
            {
                User_ID = a.User_ID,
                First_Name = a.First_Name,
                Last_Name = a.Last_Name,
                Email = a.Email,
                School = a.School,
            });
            return res;
        }

        public bool UserExists(User u)
        {
            User existingUser = _dbContext.User.FirstOrDefault(x => x.Email == u.Email);
            return existingUser != null;
        }

        public User AddUser(User u)
        {

            EntityEntry<User> e = _dbContext.User.Add(u);
            User myUser = e.Entity;
            _dbContext.SaveChanges();
            return myUser;

        }

    }
}

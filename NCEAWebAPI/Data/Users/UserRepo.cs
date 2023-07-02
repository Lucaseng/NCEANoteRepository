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

        public UserOutputDto CreateUserOutputDto(User u)
        {
            return new UserOutputDto
            {
                User_ID = u.User_ID,
                First_Name = u.First_Name,
                Last_Name = u.Last_Name,
                Email = u.Email,
                School = u.School,
            };
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _dbContext.User.ToList();
            return users;
        }

        public UserOutputDto GetUserById(int id)
        {
            User u = _dbContext.User.FirstOrDefault(u => u.User_ID == id);
            if (u == null) return null;
            return CreateUserOutputDto(u);
        }

        public IEnumerable<UserOutputDto> GetModifiedUsers()
        {
            IEnumerable<User> users = GetUsers();
            var res = users.Select(a => CreateUserOutputDto(a));
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

using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Users
{
    public interface IUserRepo
    {
        public IEnumerable<UserOutputDto> GetModifiedUsers();

        public UserOutputDto GetUserById(int id);

        public UserOutputDto GetUserByEmail(string email);
        public User AddUser(User u);

        public bool UserExists(User u);

        public bool ChangePass(String email, String pass);

    }
}

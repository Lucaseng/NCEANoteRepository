using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Users
{
    public interface IUserRepo
    {
        public IEnumerable<UserOutputDto> GetModifiedUsers();
        public User AddUser(User u);

        public bool UserExists(User u);

    }
}

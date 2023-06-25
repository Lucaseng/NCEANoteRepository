using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data
{
    public interface INCEAWebRepo
    {
        IEnumerable<User> GetUsers();

    }
}

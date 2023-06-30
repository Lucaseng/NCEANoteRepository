using NCEAWebRepo.Dtos;

namespace NCEAWebRepo.Data.Users
{
    public interface IUserRepo
    {
        IEnumerable<UserOutputDto> GetModifiedUsers();

    }
}

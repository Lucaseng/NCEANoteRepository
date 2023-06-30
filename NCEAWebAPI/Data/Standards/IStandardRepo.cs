using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Standards
{
    public interface IStandardRepo
    {
        IEnumerable<Standard> GetStandards();

    }
}

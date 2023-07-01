using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Standards
{
    public interface IStandardRepo
    {
        IEnumerable<Standard> GetStandards();
        public bool StandardExists(Standard standard);
        public Standard AddStandard(Standard standard);

    }
}

using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Standards
{
    public interface IStandardRepo
    {
        IEnumerable<Standard> GetStandards();
        public bool StandardExists(StandardInputDto standard);
        public Standard AddStandard(StandardInputDto standard);

    }
}

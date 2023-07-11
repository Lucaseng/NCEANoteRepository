using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Standards
{
    public interface IStandardRepo
    {
        IEnumerable<Standard> GetStandards();

        public IEnumerable<Standard> GetStandardsBySearch(string subject, string level);

        public Standard GetStandardById(int id);
        public bool StandardExists(StandardInputDto standard);
        public Standard AddStandard(StandardInputDto standard);

    }
}

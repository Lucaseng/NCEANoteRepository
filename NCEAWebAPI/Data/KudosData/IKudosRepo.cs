using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.KudosData
{
    public interface IKudosRepo
    {
        IEnumerable<Kudos> GetKudos();

    }
}

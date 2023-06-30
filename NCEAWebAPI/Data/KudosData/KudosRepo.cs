using Microsoft.EntityFrameworkCore;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.KudosData
{
    public class KudosRepo : IKudosRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public KudosRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Kudos> GetKudos()
        {
            IEnumerable<Kudos> kudos = _dbContext.Kudos.Include("User").Include("Note").ToList<Kudos>();
            return kudos;
        }



    }
}

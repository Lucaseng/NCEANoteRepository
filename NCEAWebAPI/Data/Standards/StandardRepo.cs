using Microsoft.EntityFrameworkCore;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Standards
{
    public class StandardRepo : IStandardRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public StandardRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }


        public IEnumerable<Standard> GetStandards()
        {
            IEnumerable<Standard> standards = _dbContext.Standard.Include("Subject").ToList<Standard>();
            return standards;
        }



    }
}

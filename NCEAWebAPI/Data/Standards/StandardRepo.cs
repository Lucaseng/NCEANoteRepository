using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NCEAWebRepo.Dtos;
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

        public Standard GetStandardById(int id)
        {
            return _dbContext.Standard.Include("Subject").FirstOrDefault(s => s.Standard_ID == id);
        }

        public bool StandardExists(StandardInputDto standard)
        {
            Standard getStandard = _dbContext.Standard.FirstOrDefault(s => s.Standard_ID == standard.Standard_ID);
            return getStandard != null;
        }

        public Standard AddStandard(StandardInputDto standard)
        {
            Standard newStandard = new Standard
            {
                Standard_ID = standard.Standard_ID,
                Title = standard.Title,
                Credits = standard.Credits,
                Assessment = standard.Assessment,
                Level = standard.Level
            };
            //Find Subject in Database and Add it to new object
            Subject sub = _dbContext.Subject.FirstOrDefault(s => s.Subject_ID == standard.Subject_ID);
            newStandard.Subject = sub;
            //Save into database
            EntityEntry<Standard> e = _dbContext.Standard.Add(newStandard);
            Standard myStandard = e.Entity;
            _dbContext.SaveChanges();
            return myStandard;
        }

        public IEnumerable<Standard> GetStandardsBySearch(string subject, string level)
        {
            IEnumerable<Standard> standards = _dbContext.Standard.Where(s => s.Subject.Subject_name == subject && s.Level == level).Include("Subject").ToList<Standard>();
            return standards;
        }


    }
}

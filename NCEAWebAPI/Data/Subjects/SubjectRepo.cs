using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Subjects
{
    public class SubjectRepo : ISubjectRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public SubjectRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Subject> GetSubjects()
        {
            IEnumerable<Subject> subjects = _dbContext.Subject.ToList<Subject>();
            return subjects;
        }


    }
}

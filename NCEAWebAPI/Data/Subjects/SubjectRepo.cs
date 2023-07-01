using Microsoft.EntityFrameworkCore.ChangeTracking;
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

        public bool SubjectExists(Subject subject)
        {
            Subject getSub = _dbContext.Subject.FirstOrDefault(s => s.Subject_name == subject.Subject_name);
            return getSub != null;

        }

        public Subject AddSubject(Subject subject)
        {
            EntityEntry<Subject> e = _dbContext.Subject.Add(subject);
            Subject mySubject = e.Entity;
            _dbContext.SaveChanges();
            return mySubject;
        }


    }
}

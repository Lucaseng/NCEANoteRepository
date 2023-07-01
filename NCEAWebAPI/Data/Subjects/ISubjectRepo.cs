using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Subjects
{
    public interface ISubjectRepo
    {
        IEnumerable<Subject> GetSubjects();
        public bool SubjectExists(Subject subject);
        public Subject AddSubject(Subject subject);
    }
}

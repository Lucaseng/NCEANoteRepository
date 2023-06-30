using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Subjects
{
    public interface ISubjectRepo
    {
        IEnumerable<Subject> GetSubjects();
    }
}

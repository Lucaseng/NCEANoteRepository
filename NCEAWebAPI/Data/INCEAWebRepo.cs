using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data
{
    public interface INCEAWebRepo
    {
        IEnumerable<User> GetUsers();
        IEnumerable<Subject> GetSubjects();
        IEnumerable<Standard> GetStandards();

        IEnumerable<Note> GetNotes();

        IEnumerable<Kudos> GetKudos();

    }
}

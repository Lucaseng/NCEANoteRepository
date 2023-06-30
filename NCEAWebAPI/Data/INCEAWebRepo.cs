using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data
{
    public interface INCEAWebRepo
    {
        IEnumerable<UserOutputDto> GetModifiedUsers();
        IEnumerable<Subject> GetSubjects();
        IEnumerable<Standard> GetStandards();

        IEnumerable<Note> GetNotes();

        IEnumerable<Kudos> GetKudos();

    }
}

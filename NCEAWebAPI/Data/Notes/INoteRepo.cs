using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Notes
{
    public interface INoteRepo
    {
        IEnumerable<Note> GetNotes();

    }
}

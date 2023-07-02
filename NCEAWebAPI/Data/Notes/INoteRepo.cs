using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Notes
{
    public interface INoteRepo
    {
        IEnumerable<Note> GetNotes();

        public Note AddNote(NoteInputDto note);

    }
}

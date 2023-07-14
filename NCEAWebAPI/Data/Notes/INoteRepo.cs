using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Notes
{
    public interface INoteRepo
    {
        public IEnumerable<Note> GetNotes();

        public List<object> SearchNotes(int endIndex, int startIndex, String keyword, String level, String assessment);

        public Note AddNote(NoteInputDto note);

        public Note GetNoteByID(int Id);

        public IEnumerable<Note> GetNotesByStandard(int Standard_ID);

        public Task<List<object>> SearchNotesAsync(int endIndex, int startIndex, string keyword, string level, string assessment);

    }
}

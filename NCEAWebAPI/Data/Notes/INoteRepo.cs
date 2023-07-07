using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Notes
{
    public interface INoteRepo
    {
        public IEnumerable<Note> GetNotes();

        //public IEnumerable<Note> SearchNotes(String keyword, int startIndex, int endIndex);

        public IEnumerable<NoteOutputDto> SearchNotes(int endIndex, int startIndex, String keyword);

        public Note AddNote(NoteInputDto note);

        public Note GetNoteByID(int Id);

        public IEnumerable<Note> GetNotesByStandard(int Standard_ID);

    }
}

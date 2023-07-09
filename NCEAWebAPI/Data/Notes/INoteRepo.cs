using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;
using System.Collections;

namespace NCEAWebRepo.Data.Notes
{
    public interface INoteRepo
    {
        public IEnumerable<Note> GetNotes();

        public ArrayList SearchNotes(int endIndex, int startIndex, String keyword, String level, String assessment);

        public Note AddNote(NoteInputDto note);

        public Note GetNoteByID(int Id);

        public IEnumerable<Note> GetNotesByStandard(int Standard_ID);

    }
}

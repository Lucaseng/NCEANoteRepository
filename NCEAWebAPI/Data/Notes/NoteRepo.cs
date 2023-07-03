using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.Notes
{
    public class NoteRepo : INoteRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public NoteRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }


        public IEnumerable<Note> GetNotes()
        {
            IEnumerable<Note> notes = _dbContext.Note.Include(n => n.Standard).ThenInclude(s => s.Subject).Include("User").ToList<Note>();
            return notes;
        }

        public Note GetNoteByID(int id)
        {
            return _dbContext.Note.Include(n => n.Standard).ThenInclude(s => s.Subject).Include("User").FirstOrDefault(n => n.Note_ID == id);
        }


        public IEnumerable<Note> GetNotesByStandard(int Standard_ID)
        {
            IEnumerable<Note> notes = _dbContext.Note.Include(n => n.Standard).ThenInclude(s => s.Subject).Include("User").Where(n => n.Standard.Standard_ID == Standard_ID).ToList<Note>();
            return notes;
        }

        public Note AddNote(NoteInputDto note)
        {
            //Create a new note
            Note newNote = new Note
            {
                File = note.File,
                File_Name = note.File_Name,
            };
            //Find User in Database
            User user = _dbContext.User.FirstOrDefault(u => u.User_ID == note.User_ID);

            //Find Standard in Database
            Standard standard = _dbContext.Standard.Include("Subject").FirstOrDefault(s => s.Standard_ID == note.Standard_ID);

            //Add to note object
            newNote.User = user;
            newNote.Standard = standard;


            //Save into database
            EntityEntry<Note> e = _dbContext.Note.Add(newNote);
            Note myNote = e.Entity;
            _dbContext.SaveChanges();
            return myNote;
        }


    }
}

using Microsoft.EntityFrameworkCore;
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


    }
}

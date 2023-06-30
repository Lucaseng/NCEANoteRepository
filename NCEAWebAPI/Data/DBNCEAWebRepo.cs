using Microsoft.EntityFrameworkCore;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data
{
    public class DBNCEAWebRepo : INCEAWebRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public DBNCEAWebRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _dbContext.User.ToList<User>();
            return users;
        }

        public IEnumerable<Subject> GetSubjects()
        {
            IEnumerable<Subject> subjects = _dbContext.Subject.ToList<Subject>();
            return subjects;
        }

        public IEnumerable<Standard> GetStandards()
        {
            IEnumerable<Standard> standards = _dbContext.Standard.Include("Subject").ToList<Standard>();
            return standards;
        }

        public IEnumerable<Note> GetNotes()
        {
            IEnumerable<Note> notes = _dbContext.Note.Include(n => n.Standard).ThenInclude(s => s.Subject).Include("User").ToList<Note>();
            return notes;
        }

        public IEnumerable<Kudos> GetKudos()
        {
            IEnumerable<Kudos> kudos = _dbContext.Kudos.Include("User").Include("Note").ToList<Kudos>();
            return kudos;
        }


    }
}

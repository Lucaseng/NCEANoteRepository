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

        public IEnumerable<NoteOutputDto> SearchNotes(int endIndex, int startIndex, String keyword, String level, String assessment)
        {

            if (endIndex == 0)
            {
                endIndex = 99;
            }



            IEnumerable<Note> finalNotes = new List<Note>();
            //Fetch Notes from Database
            if (keyword == "" && level == "" && assessment == "")
            {
                finalNotes = GetNotes();
            }
            else
            {
                var notes = _dbContext.Note.Where(n => n == n);
                if (keyword != "")
                {
                    notes = notes.Where(n => n.Standard.Title.ToLower().Contains(keyword.ToLower()) || n.Standard.Standard_ID.ToString().Contains(keyword) || n.Standard.Subject.Subject_name.ToLower().Contains(keyword.ToLower()));
                }
                if (level != "")
                {
                    notes = notes.Where(n => n.Standard.Level.Contains(level));
                }
                if (assessment != "")
                {
                    notes = notes.Where(n => n.Standard.Assessment == assessment);
                }


                finalNotes = notes.Include(n => n.Standard).ThenInclude(s => s.Subject).Include("User").Skip(startIndex).Take(endIndex - startIndex + 1).ToList<Note>();
            }



            //Initialise an array of NoteOutputDto objects
            List<NoteOutputDto> notesArr = new List<NoteOutputDto>();
            foreach (Note n in finalNotes)
            {
                //Get the Kudos Count for each Note, n
                int kudosCount = _dbContext.Kudos.Where(k => k.Note.Note_ID == n.Note_ID).Count();
                //Create NoteOutputDto and add it to the array above
                notesArr.Add(new NoteOutputDto
                {
                    Note_ID = n.Note_ID,
                    Kudos = kudosCount,
                    File = n.File,
                    File_Name = n.File_Name,
                    Standard = n.Standard,
                    //Create an anonymous UserOutputDto, as we want to hide particular data from the end-users.
                    User = new UserOutputDto
                    {
                        User_ID = n.User.User_ID,
                        First_Name = n.User.First_Name,
                        Last_Name = n.User.Last_Name,
                        Email = n.User.Email,
                        School = n.User.School,
                    }
                });
            }

            return notesArr.OrderByDescending(n => n.Kudos);
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

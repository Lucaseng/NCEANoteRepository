using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Notes;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly INoteRepo _repository;
        public NoteController(INoteRepo repository)
        {
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpGet()]
        public ActionResult<IEnumerable<Note>> AllNotes()
        {
            IEnumerable<Note> notes = _repository.GetNotes();
            return Ok(notes);
        }

        [AllowAnonymous]
        [HttpGet("searchAsync")]
        public ActionResult<List<object>> SearchAsync(int endIndex, int startIndex = 0, String? keyword = "", String? level = "", String? assessment = "")
        {
            Task<List<object>> notes = _repository.SearchNotesAsync(endIndex, startIndex, keyword, level, assessment);
            return Ok(notes);
        }


        [AllowAnonymous]
        [HttpGet("search")]
        public ActionResult<List<object>> Search(int endIndex, int startIndex = 0, String? keyword = "", String? level = "", String? assessment = "")
        {
            List<object> notes = _repository.SearchNotes(endIndex, startIndex, keyword, level, assessment);
            return Ok(notes);
        }

        [AllowAnonymous]
        [HttpGet("id")]
        public ActionResult<Note> GetNotebyId(int id)
        {
            Note note = _repository.GetNoteByID(id);
            if (note == null)
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("No note exists with id {0}!", id)
                });
            }
            else
            {
                return Ok(note);
            }

        }

        [AllowAnonymous]
        [HttpGet("standard")]
        public ActionResult<IEnumerable<Note>> GetNotesByStandard(int Standard_ID)
        {
            IEnumerable<Note> notes = _repository.GetNotesByStandard(Standard_ID);
            return Ok(notes);
        }

        [Authorize(Roles = "User, Admin")]
        [HttpPost()]
        public ActionResult<String> AddNote(NoteInputDto note)
        {
            return Ok(_repository.AddNote(note));

        }
    }
}

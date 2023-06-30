using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly INCEAWebRepo _repository;
        public NoteController(INCEAWebRepo repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Note>> AllNotes()
        {
            IEnumerable<Note> notes = _repository.GetNotes();
            return Ok(notes);
        }
    }
}

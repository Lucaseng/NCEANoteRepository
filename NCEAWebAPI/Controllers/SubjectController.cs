using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Subjects;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectController : Controller
    {
        private readonly ISubjectRepo _repository;

        public SubjectController(ISubjectRepo repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Subject>> AllSubjects()
        {
            IEnumerable<Subject> subjects = _repository.GetSubjects();
            return Ok(subjects);
        }

    }
}

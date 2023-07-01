using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Subjects;
using NCEAWebRepo.Dtos;
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

        [HttpPost()]
        public ActionResult<String> AddSubject(Subject subject)
        {
            //Create a new subject
            Subject mySub = new Subject
            {
                Subject_name = subject.Subject_name,
            };

            //Check if subject exists
            if (!_repository.SubjectExists(mySub))
            {
                return Ok(_repository.AddSubject(mySub));
            }
            else
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("The subject {0} already exists in the system!", subject.Subject_name)
                });

            }


        }

    }
}

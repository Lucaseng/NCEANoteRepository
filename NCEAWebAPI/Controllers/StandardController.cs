using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Standards;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/standards")]
    [ApiController]
    public class StandardController : Controller
    {
        private readonly IStandardRepo _repository;

        public StandardController(IStandardRepo repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Standard>> AllStandards()
        {
            IEnumerable<Standard> standards = _repository.GetStandards();
            return Ok(standards);
        }

        [HttpPost()]
        public ActionResult<String> AddStandard(Standard standard)
        {

            //Check if standard exists
            if (!_repository.StandardExists(standard))
            {
                return Ok(_repository.AddStandard(standard));
            }
            else
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("The standard {0} already exists in the system!", standard.Standard_ID)
                });

            }


        }

    }
}

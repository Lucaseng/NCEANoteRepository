using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
        [HttpGet()]
        public ActionResult<IEnumerable<Standard>> AllStandards()
        {
            IEnumerable<Standard> standards = _repository.GetStandards();
            return Ok(standards);
        }

        [AllowAnonymous]
        [HttpGet("id")]
        public ActionResult<Standard> GetStandardById(int Standard_ID)
        {
            Standard standard = _repository.GetStandardById(Standard_ID);
            if (standard == null)
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("A Standard with id {0} does not exist!", Standard_ID)
                });
            }
            return Ok(standard);

        }


        [Authorize(Roles = "Admin")]
        [HttpPost()]
        public ActionResult<String> AddStandard(StandardInputDto standard)
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

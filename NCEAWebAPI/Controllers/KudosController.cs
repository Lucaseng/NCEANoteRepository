using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.KudosData;
using NCEAWebRepo.Dtos;

namespace NCEAWebRepo.Controllers
{
    [Route("api/kudos")]
    [ApiController]
    public class KudosController : Controller
    {
        private readonly IKudosRepo _repository;

        public KudosController(IKudosRepo repository)
        {
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpGet()]
        public ActionResult<IEnumerable<KudosOutputDto>> AllKudos()
        {
            IEnumerable<KudosOutputDto> kudos = _repository.GetKudos();
            return Ok(kudos);
        }

        [AllowAnonymous]
        [HttpGet("id")]
        public ActionResult<IEnumerable<int>> GetKudosByUserId(int id)
        {
            IEnumerable<int> kudos = _repository.GetKudosByUserId(id);
            return Ok(kudos);
        }

        [AllowAnonymous]
        [HttpGet("count")]
        public ActionResult<int> GetKudosCount(int Note_ID)
        {
            int myCount = _repository.GetKudosCount(Note_ID);
            return Ok(myCount);
        }

        [Authorize(Roles = "User, Admin")]
        [HttpPost()]
        public ActionResult<String> GiveKudos(KudosInputDto kudos)
        {
            if (_repository.CanAwardKudos(kudos))
            {
                return Ok(_repository.GiveKudos(kudos));
            }
            else
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("User {0} has already given kudos for Note {1}!", kudos.User_ID, kudos.Note_ID)
                });
            }


        }
    }
}

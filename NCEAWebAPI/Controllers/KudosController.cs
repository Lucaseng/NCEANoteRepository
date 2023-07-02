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

        [HttpGet()]
        public ActionResult<IEnumerable<KudosOutputDto>> AllKudos()
        {
            IEnumerable<KudosOutputDto> kudos = _repository.GetKudos();
            return Ok(kudos);
        }

        [HttpGet("count")]
        public ActionResult<int> GetKudosCount(int Note_ID)
        {
            int myCount = _repository.GetKudosCount(Note_ID);
            return Ok(myCount);
        }

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

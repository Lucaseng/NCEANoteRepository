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
        private readonly IConfiguration _config;
        public KudosController(IKudosRepo repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }

        [AllowAnonymous]
        [HttpGet()]
        public ActionResult<IEnumerable<KudosOutputDto>> AllKudos()
        {
            try
            {
                IEnumerable<KudosOutputDto> kudos = _repository.GetKudos();
                return Ok(kudos);
            }
            catch (Exception ex)
            {
                return Ok("There was error");
            }

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

        [Authorize(Roles = "User, Admin")]
        [HttpDelete()]
        public ActionResult<String> DeleteKudosByNoteId(int NoteId)
        {
            int userId = Int32.Parse(User.FindFirst("Id").Value);




            if (_repository.CanDeleteKudos(NoteId, userId))
            {
                return Ok(_repository.DeleteKudos(NoteId));
            }
            else
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("You are not authorized to delete this kudo!")
                });
            }


        }
    }
}

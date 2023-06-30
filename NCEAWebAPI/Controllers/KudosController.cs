using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.KudosData;
using NCEAWebRepo.Models;

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
        public ActionResult<IEnumerable<Kudos>> AllKudos()
        {
            IEnumerable<Kudos> kudos = _repository.GetKudos();
            return Ok(kudos);
        }
    }
}

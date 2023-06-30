using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/kudos")]
    [ApiController]
    public class KudosController : Controller
    {
        private readonly INCEAWebRepo _repository;

        public KudosController(INCEAWebRepo repository)
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

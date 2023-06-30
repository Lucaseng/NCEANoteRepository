using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/standards")]
    [ApiController]
    public class StandardController : Controller
    {
        private readonly INCEAWebRepo _repository;

        public StandardController(INCEAWebRepo repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Standard>> AllStandards()
        {
            IEnumerable<Standard> standards = _repository.GetStandards();
            return Ok(standards);
        }

    }
}

using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Standards;
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

    }
}

using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly INCEAWebRepo _repository;

        public UserController(INCEAWebRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("GetVersion")]
        public ActionResult<String> GetVersion()
        {
            String myVersion = "1.0.0";
            return Ok(myVersion);
        }

        [HttpGet()]
        public ActionResult<IEnumerable<User>> AllUsers()
        {
            IEnumerable<User> users = _repository.GetUsers();
            return Ok(users);
        }

    }
}

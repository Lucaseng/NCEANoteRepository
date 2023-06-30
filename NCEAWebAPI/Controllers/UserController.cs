using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Users;
using NCEAWebRepo.Dtos;

namespace NCEAWebRepo.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepo _repository;

        public UserController(IUserRepo repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<UserOutputDto>> AllUsers()
        {
            IEnumerable<UserOutputDto> users = _repository.GetModifiedUsers();
            return Ok(users);
        }

    }
}

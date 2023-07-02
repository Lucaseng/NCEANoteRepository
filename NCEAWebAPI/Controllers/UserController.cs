using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Users;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

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

        [HttpGet("id")]
        public ActionResult<UserOutputDto> GetUserById(int User_ID)
        {
            UserOutputDto user = _repository.GetUserById(User_ID);
            if (user == null)
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("The id {0} does not exist!", User_ID)
                });
            }
            else
            {
                return Ok(user);
            }

        }

        [HttpPost()]
        public ActionResult<String> AddUser(User user)
        {
            User c = new User
            {
                First_Name = user.First_Name,
                Last_Name = user.Last_Name,
                Email = user.Email,
                Password = user.Password,
                School = user.School
            };
            if (!_repository.UserExists(c))
            {
                User createdUser = _repository.AddUser(c);
                return Ok(createdUser);
            }
            else
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("The email {0} already exists in the system!", user.Email)
                });

            }


        }

    }
}

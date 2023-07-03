using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Users;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;
using System.Text.RegularExpressions;

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

        [Authorize(AuthenticationSchemes = "UserAuth")]
        [Authorize(Policy = "UserOnly")]
        [HttpPatch("password")]
        public ActionResult<String> ChangePass(String newPass)
        {
            var claim = HttpContext.User.Claims.First(c => c.Type == "email");
            var emailAddress = claim.Value;
            _repository.ChangePass(emailAddress, newPass);
            return Ok("Password Succesfully Changed.");
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


        [Authorize(AuthenticationSchemes = "UserAuth")]
        [Authorize(Policy = "UserOnly")]
        [HttpPost("me")]
        public ActionResult<UserOutputDto> Auth()
        {
            var claim = HttpContext.User.Claims.First(c => c.Type == "email");
            var emailAddress = claim.Value;
            return Ok(_repository.GetUserByEmail(emailAddress));

        }


        [HttpPost()]
        public ActionResult<String> AddUser(User user)
        {
            Regex regex = new Regex(@".school.nz$");
            if (!regex.IsMatch(user.Email))
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("Emails must be from a school domain!", user.Email)
                });
            }

            User c = new User
            {
                First_Name = user.First_Name,
                Last_Name = user.Last_Name,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password),
                School = user.School,
                User_Type = "User",
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

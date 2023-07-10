using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NCEAWebRepo.Data.Auth;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NCEAWebRepo.Controllers
{
    public class AuthController : Controller
    {

        private readonly IAuthRepo _repository;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepo repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("auth")]

        public ActionResult Login([FromBody] LoginInput cred)
        {
            User user = _repository.Login(cred);
            if (user == null)
            {
                return Unauthorized("Invalid email or password provided!");
            }
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes
            (_config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("Id", user.User_ID.ToString()),
                new Claim(ClaimTypes.Role, user.User_Type),
                new Claim("First_Name", user.First_Name),
                new Claim("Last_Name", user.Last_Name),
                new Claim("Email", user.Email),

             }),
                Expires = DateTime.UtcNow.AddHours(30),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);
            return Ok(stringToken);


        }
    }
}

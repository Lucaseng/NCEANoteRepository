using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NCEAWebRepo.Controllers
{
    public class GeneralController : Controller
    {
        [AllowAnonymous]
        [HttpGet("GetVersion")]
        public ActionResult<String> GetVersion()
        {
            String myVersion = "2.0.0";
            return Ok(myVersion);
        }
    }
}

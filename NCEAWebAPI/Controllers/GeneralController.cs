using Microsoft.AspNetCore.Mvc;

namespace NCEAWebRepo.Controllers
{
    public class GeneralController : Controller
    {
        [HttpGet("GetVersion")]
        public ActionResult<String> GetVersion()
        {
            String myVersion = "1.0.0";
            return Ok(myVersion);
        }
    }
}

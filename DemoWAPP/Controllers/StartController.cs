using Microsoft.AspNetCore.Mvc;

namespace DemoWAPP.Controllers
{
    [ApiController]
    [Route("")]
    public class StartController : ControllerBase
    {
        private readonly ILogger<StartController> _logger;

        public StartController(ILogger<StartController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            return "Welcome to the Demo Web Application!";
        }
    }
}

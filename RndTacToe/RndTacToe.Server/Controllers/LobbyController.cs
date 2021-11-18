using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RndTacToe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetLobby()
        {
            return Ok("Creata la lobby");
        }
    }
}

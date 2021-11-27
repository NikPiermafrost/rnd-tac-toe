using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RndTacToe.Lobby.Core;
using RndTacToe.Models.LobbyDtos;

namespace RndTacToe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        private readonly ILobbyService _lobbyService;
        public LobbyController(ILobbyService lobbyService)
        {
            _lobbyService = lobbyService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetLobby()
        {
            return Ok(await _lobbyService.GetLobbyAsync());
        }

        [HttpGet("[action]/{gameId}")]
        public async Task<IActionResult> GetRoomExistence(string gameId)
        {
            var gameToFind = await _lobbyService.GetLobbyDetail(gameId);
            if (gameToFind == null)
            {
                return Ok(false);
            }
            return Ok(true);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> NewGame([FromBody] NewRoomDto newRoom)
        {
            try
            {
                return Ok(await _lobbyService.NewGameAsync(newRoom));
            }
            catch (Exception)
            {
                return StatusCode(500, false);
            }
        }
    }
}

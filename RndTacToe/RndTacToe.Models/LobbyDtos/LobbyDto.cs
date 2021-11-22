using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RndTacToe.Models.LobbyDtos
{
    public class LobbyDto
    {
        public LobbyDto(string gameId, string playerName)
        {
            GameId = gameId;
            PlayerName = playerName;
        }
        public string GameId { get; set; }
        public string PlayerName { get; set; }
    }
}

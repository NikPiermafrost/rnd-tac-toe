using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RndTacToe.Models.LobbyDtos
{
    public class NewRoomDto
    {
        public NewRoomDto(string playerName, string gameId)
        {
            PlayerName = playerName;
            GameId = gameId;
        }
        public string PlayerName { get; set; }
        public string GameId { get; set; }
    }
}

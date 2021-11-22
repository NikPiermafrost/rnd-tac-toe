using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RndTacToe.Models.LobbyEntities
{
    public class Room
    {
        public Room(string gameId, string playerName)
        {
            GameId = gameId;
            PlayerName = playerName;
        }
        [Key]
        public int RoomId { get; set; }
        public string GameId { get; set; }
        public string PlayerName { get; set; }
    }
}

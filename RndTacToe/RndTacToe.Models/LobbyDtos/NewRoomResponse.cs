using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RndTacToe.Models.LobbyDtos
{
    public class NewRoomResponse
    {
        public bool IsCreated { get; set; }
        public string? Reason { get; set; }
    }
}

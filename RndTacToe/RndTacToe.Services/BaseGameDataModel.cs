using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RndTacToe.Services
{
    public class BaseGameDataModel
    {
        public int PlayerOneRandomValue { get; set; }
        public int PlayerTwoRandomValue { get; set; }
        public string GameId { get; set; }
    }
}

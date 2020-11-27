using RndTacToe.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RndTacToe.Client.Services
{
    public class MainHelpersService : IMainHelpersService
    {
        private readonly Random _rnd;
        public MainHelpersService()
        {
            _rnd = new Random();
        }

        public int GetRandomnessValue(string userName)
        {
            var initialValue = _rnd.Next(0, 100);
            if (initialValue % 2 == 0)
            {
                var today = DateTime.Today.DayOfWeek;
                return initialValue / (int)today + userName.Length;
            }
            else
            {
                return initialValue - userName.Length;
            }
        }
    }
}

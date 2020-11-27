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
        public string StoredUserName { get; set; }
        public int StoredRandomness { get; set; }
        public MainHelpersService()
        {
            _rnd = new Random();
        }

        public void SetRandomnessValue(string userName)
        {
            var initialValue = _rnd.Next(0, 100);
            if (initialValue % 2 == 0)
            {
                var today = DateTime.Today.DayOfWeek;
                StoredRandomness = initialValue / (int)today + userName.Length;
            }
            else
            {
                StoredRandomness = initialValue - userName.Length;
            }
        }

        public void SetCurrentUserName(string userName)
        {
            StoredUserName = userName;
        }
    }
}

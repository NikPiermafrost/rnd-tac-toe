using RndTacToe.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RndTacToe.Shared.Services
{
    public class MainHelpersService : IMainHelpersService
    {
        private readonly List<int[]> _conditions;
        private readonly Random _rnd;
        public string StoredUserName { get; set; }
        public int StoredRandomness { get; set; }
        public bool HasStarted { get; set; }
        public MainHelpersService()
        {
            _rnd = new Random();
            _conditions = new List<int[]> 
            {
                new int[] { 0, 1, 2 },
                new int[] { 3, 4, 5 },
                new int[] { 6, 7, 8 },
                new int[] { 0, 3, 6 },
                new int[] { 1, 4, 7 },
                new int[] { 2, 5, 8 },
                new int[] { 0, 4, 8 },
                new int[] { 2, 4, 6 }
            };
        }

        public void SetRandomnessValue(string userName)
        {
            var initialValue = _rnd.Next(0, 100);
            if (initialValue % 2 == 0)
            {
                var today = DateTime.Today.DayOfWeek;
                StoredRandomness = initialValue / ((int)today + userName.Length);
            }
            else
            {
                StoredRandomness = initialValue - userName.Length;
            }
        }
        public void SetHasStarted(bool hasStarted)
        {
            HasStarted = hasStarted;
        }

        public bool GetHasStartedStatus()
        {
            return HasStarted;
        }

        public void SetCurrentUserName(string userName)
        {
            StoredUserName = userName;
        }

        public string GetCurrentPlayerName()
        {
            return StoredUserName;
        }

        public int GetCurrentRandomness()
        {
            return StoredRandomness;
        }

        public bool HasSomeOneWon(TicTacToeCell[] grid)
        {
            foreach (var condition in _conditions)
            {
                var res = grid[condition[0]].StoredChar == grid[condition[1]].StoredChar
                      && grid[condition[1]].StoredChar == grid[condition[2]].StoredChar;
                if (res && !string.IsNullOrEmpty(grid[condition[0]].StoredChar))
                {
                    return true;
                }
            }
            return false;
        }
    }
}

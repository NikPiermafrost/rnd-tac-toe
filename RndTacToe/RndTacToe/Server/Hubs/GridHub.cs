using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RndTacToe.Server.Hubs
{
    public class GridHub: Hub
    {
        public async Task OnUserConnect(string gameId, string username, int randomChanche)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("ReceiveOpponent", username, randomChanche);
        }

        public async Task RemoveFromGroup(string gameId, string username)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("Send", $"{username} has left the game");
        }

        public async Task MoveSelected(string gameId, string userName, int position)
        {
            await Clients.Group(gameId).SendAsync("Move", userName, position);
        }
    }
}

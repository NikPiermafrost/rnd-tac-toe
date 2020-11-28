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
            await Clients.Group(gameId).SendAsync("HasExited", $"{username} has left the game");
        }

        public async Task MoveSelected(string gameId, int position, string symbol)
        {
            await Clients.Group(gameId).SendAsync("Move", position, symbol);
        }
    }
}

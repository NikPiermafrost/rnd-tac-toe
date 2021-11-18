using Microsoft.AspNetCore.SignalR;
using RndTacToe.ConnectionManager;

namespace RndTacToe.Server.Hubs
{
    public class GameHub : Hub
    {
        private readonly IHubGroupManager _groupManager;
        public GameHub(IHubGroupManager hubGroupManager)
        {
            _groupManager = hubGroupManager;
        }
        public async Task OnUserConnect(string gameId, string username, int randomChanche)
        {
            try
            {
                _groupManager.AddGroupToActiveGroups(gameId, Context.ConnectionId);
                await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
                await Clients.Group(gameId).SendAsync("ReceiveOpponent", username, randomChanche);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                _groupManager.RemoveGroupByGameId(gameId);
            }
        }

        public async Task RemoveFromGroup(string gameId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("HasExited", "Your opponent has exited the game");
        }

        public async Task MoveSelected(string gameId, int position, string symbol)
        {
            await Clients.Group(gameId).SendAsync("Move", position, symbol);
        }

        public async Task Rematch(string gameId)
        {
            await Clients.Group(gameId).SendAsync("RestartMatch");
        }

        public override async Task OnConnectedAsync()
        {
            var game = _groupManager.GetGroupIdFromConnectionId(Context.ConnectionId);
            if (game != null)
            {
                await Clients.Group(game.GroupId).SendAsync("HasExited", "Your opponent has exited the game");
            }
        }
    }
}

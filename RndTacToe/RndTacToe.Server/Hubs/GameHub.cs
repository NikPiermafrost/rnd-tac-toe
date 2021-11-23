using Microsoft.AspNetCore.SignalR;
using RndTacToe.ConnectionManager;
using RndTacToe.Lobby.Core;
using RndTacToe.Models.LobbyDtos;

namespace RndTacToe.Server.Hubs
{
    public class GameHub : Hub
    {
        private readonly IHubGroupManager _groupManager;
        private readonly ILobbyService _lobbyService;
        public GameHub(IHubGroupManager hubGroupManager, ILobbyService lobbyService)
        {
            _groupManager = hubGroupManager;
            _lobbyService = lobbyService;
        }
        public async Task OnUserConnect(string gameId, string username, int randomChanche)
        {
            try
            {
                _groupManager.AddGroupToActiveGroups(gameId, Context.ConnectionId);
                var gameDetail = await _lobbyService.GetLobbyDetail(gameId);
                if (gameDetail != null)
                {
                    await _lobbyService.DeleteGameAsync(gameId);
                }
                await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
                await Clients.Group(gameId).SendAsync("ReceiveOpponent", username, randomChanche);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                _groupManager.RemoveGroupByGameId(gameId);
                await _lobbyService.DeleteGameAsync(gameId);
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

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var game = _groupManager.GetGroupIdFromConnectionId(Context.ConnectionId);
            if (game != null)
            {
                await Clients.Group(game.GroupId).SendAsync("HasExited", "Your opponent has exited the game");
                _groupManager.RemoveGroupByGameId(game.GroupId);
                await _lobbyService.DeleteGameAsync(game.GroupId);
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}

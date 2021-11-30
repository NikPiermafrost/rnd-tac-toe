using RndTacToe.Models.LobbyDtos;

namespace RndTacToe.Lobby.Core
{
    public interface ILobbyService
    {
        Task<bool> DeleteGameAsync(string gameId);
        Task<IEnumerable<LobbyDto>> GetLobbyAsync();
        Task<LobbyDto?> GetLobbyDetail(string gameId);
        Task<NewRoomResponse> NewGameAsync(NewRoomDto newRoom);
    }
}
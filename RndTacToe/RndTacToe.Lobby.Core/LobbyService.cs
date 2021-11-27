using Microsoft.EntityFrameworkCore;
using RndTacToe.Lobby.DataAccess;
using RndTacToe.Models.LobbyDtos;
using RndTacToe.Models.LobbyEntities;

namespace RndTacToe.Lobby.Core
{
    public class LobbyService : ILobbyService
    {
        private readonly LobbyContext _context;

        public LobbyService(LobbyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LobbyDto>> GetLobbyAsync()
        {
            return await _context.Rooms.Select(x => new LobbyDto(x.GameId, x.PlayerName)).ToListAsync();
        }

        public async Task<LobbyDto?> GetLobbyDetail(string gameId)
        {
            var roomToFind = await _context.Rooms.FirstOrDefaultAsync(x => x.GameId == gameId);
            if (roomToFind != null)
            {
                return new LobbyDto(gameId, roomToFind.PlayerName);
            }
            return null;
        }

        public async Task<NewRoomResponse> NewGameAsync(NewRoomDto newRoom)
        {
            try
            {
                var lobbies = await GetLobbyAsync();
                if (lobbies.Count() >= 50)
                {
                    return new NewRoomResponse
                    {
                        IsCreated = false,
                        Reason = "Lobby is full, please wait to create another game"
                    };
                }
                var roomToInsert = new Room(newRoom.GameId, newRoom.PlayerName);
                await _context.Rooms.AddAsync(roomToInsert);
                await _context.SaveChangesAsync();
                return new NewRoomResponse()
                {
                    IsCreated = true
                };
            }
            catch (Exception ex)
            {

                return new NewRoomResponse
                {
                    IsCreated = false,
                    Reason = ex.Message
                };
            }
        }

        public async Task<bool> DeleteGameAsync(string gameId)
        {
            try
            {
                var toDelete = await _context.Rooms.SingleAsync(x => x.GameId == gameId);
                if (toDelete != null)
                {
                    _context.Rooms.Remove(toDelete);
                    await _context.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
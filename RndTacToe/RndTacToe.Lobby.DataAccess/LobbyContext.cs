using Microsoft.EntityFrameworkCore;
using RndTacToe.Models.LobbyEntities;

namespace RndTacToe.Lobby.DataAccess
{
    public class LobbyContext: DbContext
    {
        public LobbyContext(DbContextOptions<LobbyContext> options): base(options) { }
        public virtual DbSet<Room> Rooms { get; set; }
    }
}
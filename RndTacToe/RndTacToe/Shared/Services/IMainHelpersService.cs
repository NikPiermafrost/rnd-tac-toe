using RndTacToe.Shared;

namespace RndTacToe.Shared.Services
{
    public interface IMainHelpersService
    {
        void SetRandomnessValue(string userName);
        void SetCurrentUserName(string userName);
        string GetCurrentPlayerName();
        int GetCurrentRandomness();
        void SetHasStarted(bool hasStarted);
        bool GetHasStartedStatus();
        bool HasSomeOneWon(TicTacToeCell[] grid);
    }
}
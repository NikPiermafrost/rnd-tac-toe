namespace RndTacToe.ConnectionManager
{
    public interface IHubGroupManager
    {
        void AddGroupToActiveGroups(string groupId, string connectionId);
        Group GetGroupIdFromConnectionId(string connectionId);
        void RemoveGroupByGameId(string groupId);
        void RemoveGroupByConnectionId(string connectionId);
        bool GroupExists(string groupId);
    }
}
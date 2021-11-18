namespace RndTacToe.ConnectionManager
{
    public class HubGroupManager : IHubGroupManager
    {
        public List<Group> ActiveGroups { get; set; }
        public HubGroupManager()
        {
            this.ActiveGroups = new List<Group>();
        }

        public void AddGroupToActiveGroups(string groupId, string connectionId)
        {
            var group = new Group { GroupId = groupId, ConnectionId = connectionId };
            ActiveGroups.Add(group);
        }

        public void RemoveGroupByGameId(string groupId)
        {
            var groupToFind = ActiveGroups.FirstOrDefault(x => x.GroupId == groupId);
            if (groupToFind != null)
            {
                ActiveGroups.Remove(groupToFind);
            }
        }

        public void RemoveGroupByConnectionId(string connectionId)
        {
            var groupToFind = GetGroupIdFromConnectionId(connectionId);
            if (groupToFind != null)
            {
                ActiveGroups.Remove(groupToFind);
            }
        }

        public Group GetGroupIdFromConnectionId(string connectionId)
        {
            return ActiveGroups.FirstOrDefault(x => x.ConnectionId == connectionId);
        }
    }
}
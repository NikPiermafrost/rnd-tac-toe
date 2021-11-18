﻿namespace RndTacToe.ConnectionManager
{
    public class HubGroupManager : IHubGroupManager
    {
        public List<Group> ActiveGroups { get; set; }
        public HubGroupManager()
        {
            ActiveGroups = new List<Group>();
        }

        public void AddGroupToActiveGroups(string groupId, string connectionId)
        {
            var group = new Group { GroupId = groupId, ConnectionId = connectionId };
            ActiveGroups.Add(group);
            Console.WriteLine(ActiveGroups);
        }

        public void RemoveGroupByGameId(string groupId)
        {
            ActiveGroups.RemoveAll(x => x.GroupId.Equals(groupId));
        }

        public void RemoveGroupByConnectionId(string connectionId)
        {
            ActiveGroups.RemoveAll(x => x.ConnectionId.Equals(connectionId));
        }

        public Group GetGroupIdFromConnectionId(string connectionId)
        {
            return ActiveGroups.FirstOrDefault(x => x.ConnectionId.Equals(connectionId));
        }

        public bool GroupExists(string groupId)
        {
            return ActiveGroups.FirstOrDefault(x => x.GroupId.Equals(groupId)) != null;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RndTacToe.Models.ConnectionManager
{
    public class Group
    {
        public Group(string groupId, string connectionId)
        {
            GroupId = groupId;
            ConnectionId = connectionId;
        }
        public string GroupId { get; set; }
        public string ConnectionId { get; set; }
    }
}

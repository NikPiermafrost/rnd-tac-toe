using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RndTacToe.Shared
{
    public class LoginForm
    {
        [Required]
        [MinLength(4, ErrorMessage = "Name too short")]
        [MaxLength(16, ErrorMessage = "Name too long")]
        public string Username { get; set; }
        public string GameCode { get; set; }
    }
}

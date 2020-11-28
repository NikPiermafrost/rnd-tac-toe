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
        [Display(Name = "Username")]
        [MinLength(4, ErrorMessage = "Name too short")]
        [MaxLength(16, ErrorMessage = "Name too long")]
        public string Username { get; set; }
        [Display(Name = "Game Code")]
        public string GameCode { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
    }
}
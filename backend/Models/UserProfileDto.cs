namespace backend.Models
{
    public class UserProfileDto
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
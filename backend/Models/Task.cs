using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public bool IsCompleted { get; set; } = false;
        
        [ForeignKey("User")]
        public int UserId { get; set; }
        
        public virtual User? User { get; set; }
    }
}
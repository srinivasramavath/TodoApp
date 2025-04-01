using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
public class TaskCreateDto
{
    [Required]
    //[StringLength(100)]
    public string Title { get; set; }

    //[StringLength(500)]
    public string Description { get; set; }
}
}
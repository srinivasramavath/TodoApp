// TaskUpdateDto.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
public class TaskUpdateDto
{
    //[StringLength(100, MinimumLength = 3)]
    public string? Title { get; set; }

    //[StringLength(500)]
    public string? Description { get; set; }

    public bool? IsCompleted { get; set; }
}
}
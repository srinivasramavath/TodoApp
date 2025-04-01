using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace TodoProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
            return Ok(tasks);
        }

        //[HttpPost]
[HttpPost]
public async Task<IActionResult> AddTask([FromBody] TaskCreateDto taskDto)
{
    try
    {
        // 1. Verify the JWT token and get user ID
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim) )
        {
            return Unauthorized("Invalid token - user ID not found");
        }

        if (!int.TryParse(userIdClaim, out int userId))
        {
            return BadRequest("Invalid user ID format in token");
        }

        // 2. Validate the task DTO
        if (string.IsNullOrWhiteSpace(taskDto.Title))
        {
            return BadRequest("Task title is required");
        }

        // 3. Create and save the task
        var task = new backend.Models.Task
        {
            Title = taskDto.Title,
            Description = taskDto.Description,
            IsCompleted = false,
            UserId = userId,
            //CreatedAt = DateTime.UtcNow  // Optional: Add creation timestamp
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        // 4. Return the created task with 201 status
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }
    catch (Exception ex)
    {
        // Log the error
        //ILogger.LogError(ex, "Error adding task");
        return StatusCode(500, "An error occurred while adding the task");
    }
}
[HttpPut("{id}")]
public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateDto updateDto)
{
    // 1. Get current user ID from JWT
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
    
    // 2. Find the task
    var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

    if (task == null)
        return NotFound();

    // 3. Apply updates (only modify provided fields)
    if (!string.IsNullOrWhiteSpace(updateDto.Title))
        task.Title = updateDto.Title;

    if (updateDto.Description != null) // Allows clearing description
        task.Description = updateDto.Description;

    if (updateDto.IsCompleted.HasValue)
        task.IsCompleted = updateDto.IsCompleted.Value;

    // 4. Save changes
    await _context.SaveChangesAsync();

    return Ok(task);
}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
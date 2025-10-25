using App.Application.Dto_s.User;
using App.Application.Services;
using App.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using App.Application.Dto_s.Memory;
using Microsoft.AspNetCore.Authorization;

namespace App.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MemoryController : ControllerBase
    {
        private readonly MemoryService _memoryService;

        public MemoryController(MemoryService memoryService)
        {
            _memoryService = memoryService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllMemories()
        {
            var memories = await _memoryService.GetAllMemoriesAsync();
            return Ok(memories);
        }


        [Authorize]
        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetMemoryById(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("userId")!.Value);
                var memory = await _memoryService.GetMemoryByIdAsync(id, userId);
                return Ok(memory);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpGet("getmy")]
        public async Task<IActionResult> GetMyMemories()
        {
            var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var userId))
                return Unauthorized();

            try
            {
                var memories = await _memoryService.GetMemoryByUserIdAsync(userId);
                return Ok(memories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Sunucu hatası: " + ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateMemory([FromBody] MemoryCreateDTO memory)
        {
              var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var userId))
                return Unauthorized();

            if (memory.UserId != userId) return Forbid("Kendi dışınızda bir kullanıcı için sayfa oluşturamazsınız.");
         
            try
            {
            var newMemoryId = await _memoryService.CreateMemoryAsync(memory);
            return CreatedAtAction(nameof(GetMemoryById), new { id = newMemoryId }, new { newMemoryId, memory }); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMemory(int id, [FromBody] MemoryUpdateDTO memoryDto)
        {
            var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var userId))
                return Unauthorized();

            try
            {
                var existingMemory = await _memoryService.GetMemoryByIdAsync(id, userId);

                await _memoryService.UpdateMemoryAsync(id, memoryDto);

                return Ok("Başarıyla güncellendi");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Sunucu hatası: " + ex.Message);
            }
        }

        [Authorize]
        [HttpPut("favorite/{id}")]
        public async Task<IActionResult> UpdateFavoriteMemory(int id)
        {
            var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var userId))
                return Unauthorized();

            try
            {
                var existingMemory = await _memoryService.GetMemoryByIdAsync(id, userId);

                await _memoryService.UpdateFavoriteMemoryAsync(id);

                return Ok("Başarıyla güncellendi");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Sunucu hatası: " + ex.Message);
            }
        }


        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemory(int id)
        {
            var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var userId))
            { return Unauthorized(); }

            try
            {
                var existingMemory = await _memoryService.GetMemoryByIdAsync(id, userId);
                await _memoryService.DeleteMemoryAsync(id);
                return NoContent();

            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Sunucu hatası: " + ex.Message);
            }

        }
    }
}

using App.Application.Dto_s.User;
using App.Application.Services;
using App.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("loggeduser")]
        public async Task<IActionResult> GetUserById()
        {
            var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var id))
                return Unauthorized();
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var user = await _userService.GetUserByEmailAsync(dto.UserEmail);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.UserPassword, user.UserPasswordHash))
                return Unauthorized("Email veya şifre yanlış.");

            var token = _userService.GenerateJwtToken(user);
            return Ok(new { token });
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDTO user)
        {
            try
            {
                var newUserId = await _userService.CreateUserAsync(user);
                if (newUserId == 0) return BadRequest("Hashlenmedi");
                return Ok(new { userId = newUserId });
            }
            catch (Exception ex)
            {
                return  StatusCode(410, ex.Message);
            }

        }

        [Authorize]
        [HttpPut("updateuser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserCreateDTO user)
        {
            var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var id))
                return Unauthorized();
            var getUser = await _userService.GetUserByEmailAsync(user.UserEmail);

            if (getUser == null || !BCrypt.Net.BCrypt.Verify(user.UserPassword, getUser.UserPasswordHash))
                return Unauthorized("Email veya şifre yanlış.");


            await _userService.UpdateUserAsync(id, user);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("deleteuser")]
        public async Task<IActionResult> DeleteUser()
        {
            var claim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var id))
                return Unauthorized();

            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}

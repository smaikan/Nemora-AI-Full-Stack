using App.Application.Contracts.Persistence;
using App.Application.Dto_s.User;
using App.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace App.Application.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;

        public UserService(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserEmail),
            new Claim("userId", user.UserId.ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMonths(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }

        public async Task<int> CreateUserAsync(UserCreateDTO userdto)
        {
            string hashed = BCrypt.Net.BCrypt.HashPassword(userdto.UserPassword);
            bool isValid = BCrypt.Net.BCrypt.Verify(userdto.UserPassword, hashed);
            if (isValid)
            {
                var user = new User
                {
                    UserName = userdto.UserName,
                    UserSurname = userdto.UserSurname,
                    UserEmail = userdto.UserEmail,
                    UserPasswordHash = hashed
                };
                await _userRepository.AddAsync(user);
                return user.UserId;
            }
            return 0;
         
        }



        public async Task UpdateUserAsync(int id,UserCreateDTO userDTO)
        {
            string hashed = BCrypt.Net.BCrypt.HashPassword(userDTO.UserPassword);
            var UpdatingUser = await _userRepository.GetByIdAsync(id);

            UpdatingUser.UserName = userDTO.UserName;
            UpdatingUser.UserSurname = userDTO.UserSurname;
            UpdatingUser.UserEmail = userDTO.UserEmail;
            UpdatingUser.UserPasswordHash= hashed;

            await _userRepository.UpdateAsync(UpdatingUser);
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user != null)
            {
                await _userRepository.DeleteAsync(user);
            }
        }
    }
}

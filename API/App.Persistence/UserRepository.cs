using App.Application.Contracts.Persistence;
using App.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Persistence
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users
            .Include(u => u.UserMemories)
            .ToListAsync();
        }

        public async Task<User> GetByIdAsync(int userid) =>
            await _context.Users.Include(u => u.UserMemories)
            .FirstOrDefaultAsync(u => u.UserId == userid);

        public async Task<User> GetByEmailAsync(string email) =>
            await _context.Users.Include(u => u.UserMemories)
            .FirstOrDefaultAsync(u => u.UserEmail == email);
        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}

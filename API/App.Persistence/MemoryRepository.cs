using App.Application.Contracts.Persistence;
using App.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace App.Persistence.Repositories
{
    public class MemoryRepository : IMemoryRepository
    {
        private readonly AppDbContext _context;

        public MemoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Memory> GetByIdAsync(int id) =>
            await _context.Memories.FirstOrDefaultAsync(m => m.MemoryId == id);

        public async Task<List<Memory>> GetAllAsync() =>
            await _context.Memories.ToListAsync();

        public async Task AddAsync(Memory memory)
        {
            await _context.Memories.AddAsync(memory);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Memory memory)
        {
            _context.Memories.Update(memory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Memory memory)
        {
            _context.Memories.Remove(memory);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Memory>> GetByIdUserAsync(int userid)
        {
            return await _context.Memories.Where(u=>u.UserId == userid).ToListAsync(); 

        }
    }
}

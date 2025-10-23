using App.Domain.Entities;

namespace App.Application.Contracts.Persistence;

    public interface IMemoryRepository
    {
        Task<Memory> GetByIdAsync(int id);
         Task<List<Memory>> GetByIdUserAsync(int userid);
         Task<List<Memory>> GetAllAsync();
        Task AddAsync(Memory memory);
        Task UpdateAsync(Memory memory);
        Task DeleteAsync(Memory memory);
    }


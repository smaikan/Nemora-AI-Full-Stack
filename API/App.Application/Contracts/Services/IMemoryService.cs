using App.Application.Dto_s.Memory;
using App.Domain.Entities;

namespace App.Application.Contracts.Services
{
    public interface IMemoryService
    {
        Task<List<Memory>> GetAllMemoriesAsync();
        Task<Memory> GetMemoryByIdAsync(int id, int userId);
        Task<List<Memory>> GetMemoryByUserIdAsync(int userId);
        Task<int> CreateMemoryAsync(MemoryCreateDTO memorydto);
        Task UpdateMemoryAsync(int id, MemoryUpdateDTO memorydto);
        Task UpdateFavoriteMemoryAsync(int id);
        Task DeleteMemoryAsync(int id, int userid);
    }
}

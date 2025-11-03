using App.Domain.Entities;
namespace App.Tests.Performance;

public class MemoryRepositoryFake : App.Application.Contracts.Persistence.IMemoryRepository
{
    private readonly List<Memory> _memories = [];

    public Task AddAsync(Memory entity)
    {
        _memories.Add(entity);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Memory entity)
    {
        _memories.Remove(entity);
        return Task.CompletedTask;
    }

    public Task<List<Memory>> GetAllAsync() => Task.FromResult(_memories);

    public Task<Memory?> GetByIdAsync(int id)
        => Task.FromResult(_memories.FirstOrDefault(m => m.MemoryId == id));

    public Task<List<Memory>> GetByIdUserAsync(int userId)
        => Task.FromResult(_memories.Where(m => m.UserId == userId).ToList());

    public Task UpdateAsync(Memory entity)
    {
        return Task.CompletedTask;
    }
}
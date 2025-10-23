using App.Domain.Entities;

namespace App.Application.Contracts.Persistence;

    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int id);
    Task<List<User>> GetAllAsync();
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(User user);
        Task<User> GetByEmailAsync(string email);
    }


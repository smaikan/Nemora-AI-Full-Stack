using BenchmarkDotNet.Attributes;
using Microsoft.Extensions.Configuration;
using App.Application.Services;
using App.Application.Dto_s.Memory;
using App.Application.Contracts.Persistence;
using App.Domain.Entities;
namespace App.Tests.Performance
{
    public class MemoryServiceBenchmark
    {
        private readonly MemoryService _service;

        public MemoryServiceBenchmark()
        {
            var httpClient = new HttpClient();

            var basePath = AppContext.BaseDirectory;
            Console.WriteLine($"CONFIG PATH: {Path.Combine(basePath, "appsettings.json")}");

            var config = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

Console.WriteLine("URL: " + config["Gemini:Url"]);

            var fakeRepo = new MemoryRepositoryFake();

            _service = new MemoryService(fakeRepo, httpClient, config);
        }

        [Benchmark]
        public async Task CreateMemory_Benchmark()
        {
            try
            {
                var random = new Random();
                var dto = new MemoryCreateDTO
                {
                    UserId = 1,
                    MemoryText = "Bugün motivasyonum yerinde, dışarıda hava güzel.",
                    MemoryCreateDate = DateOnly.FromDateTime( DateTime.Now.AddDays(-random.Next(0, 30)))
                };

                await _service.CreateMemoryAsync(dto);
            }
            catch (Exception ex)
            {
                Console.WriteLine("⚠️ Benchmark hata yakaladı: " + ex.Message);
            }
        }



    }
}
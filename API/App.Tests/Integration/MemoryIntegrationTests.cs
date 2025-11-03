using System.Net;
using System.Net.Http.Json;
using App.Application.Dto_s.Memory;
using App.Domain.Entities;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Configuration;
using Xunit;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.Tests.Integration
{
    public class MemoryIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public MemoryIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.UseSetting("environment", "Testing");
                Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Testing");
                builder.ConfigureServices(services =>
                {
                    services.RemoveAll(typeof(DbContextOptions<App.Persistence.AppDbContext>));

                    services.AddDbContext<App.Persistence.AppDbContext>(options =>
                        options.UseInMemoryDatabase("TestDb_" + Guid.NewGuid()));

                    var config = new ConfigurationBuilder()
                        .AddInMemoryCollection(new Dictionary<string, string?>
                        {
                            { "Gemini:Url", "http://localhost/deneme" }
                        })
                        .Build();
                    services.AddSingleton<IConfiguration>(config);

                    services.AddScoped<App.Application.Contracts.Persistence.IMemoryRepository, App.Persistence.Repositories.MemoryRepository>();
                    services.AddScoped<App.Application.Contracts.Services.IMemoryService, App.Application.Services.MemoryService>();
                });
            });

            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task CreateMemory_ShouldReturn201Created()
        {
            var dto = new MemoryCreateDTO
            {
                UserId = 1,
                MemoryText = "Integration test",
                MemoryCreateDate = DateOnly.FromDateTime(DateTime.Now)
            };

            var response = await _client.PostAsJsonAsync("/api/memory", dto);
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine("RESPONSE BODY: " + body);

            response.StatusCode.Should().Be(HttpStatusCode.Created);
            body.Should().Contain("newMemoryId");
        }

        [Fact]
        public async Task GetAllMemories_ShouldReturnOk()
        {
            var response = await _client.GetAsync("/api/memory");
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine("RESPONSE BODY: " + body);

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var list = await response.Content.ReadFromJsonAsync<List<Memory>>();
            list.Should().BeOfType<List<Memory>>();
        }
    }
}

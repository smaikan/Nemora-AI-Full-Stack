using Xunit;
using FluentAssertions;
using Moq;
using App.Domain.Entities;
using App.Application.Dto_s.Memory;
using App.Application.Contracts.Persistence;
using App.Application.Services;
using Microsoft.Extensions.Configuration;
using System.Net.Http;

namespace App.Tests.Application
{
    public class MemoryTests
    {
        [Fact]
        public async Task Handle_ShouldCallAddAsync_WhenValidDataProvided()
        {
            var mockRepo = new Mock<IMemoryRepository>();
            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(x => x["Gemini:Url"])
          .Returns("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCa_Z9eznLQ37KcZKgocGeGy9aO1D05ORQ");
            var httpClient = new HttpClient();

            var handler = new MemoryService(mockRepo.Object, httpClient, mockConfig.Object);

            var dto = new MemoryCreateDTO
            {
                UserId = 1,
                MemoryText = "Bugün kendimi iyi hissediyorum."
            };

            await handler.CreateMemoryAsync(dto);

            mockRepo.Verify(r => r.AddAsync(It.IsAny<Memory>()), Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldThrowException_WhenMemoryTextIsEmpty()
        {
            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(x => x["Gemini:Url"])
          .Returns("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCa_Z9eznLQ37KcZKgocGeGy9aO1D05ORQ");
            var httpClient = new HttpClient();
            var mockRepo = new Mock<IMemoryRepository>();
            var handler = new MemoryService(mockRepo.Object, httpClient, mockConfig.Object);
        
            var dto = new MemoryCreateDTO
            {
                UserId = 1,
                MemoryText = "" 
            };

            Func<Task> act = async () => await handler.CreateMemoryAsync(dto);

            await act.Should().ThrowAsync<ArgumentException>()
                .WithMessage("*Memory text boş olamaz");

            mockRepo.Verify(r => r.AddAsync(It.IsAny<Memory>()), Times.Never);
        }
    }
}

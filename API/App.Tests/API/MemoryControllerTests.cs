using App.API.Controllers;
using App.Application.Contracts.Services;
using App.Application.Dto_s.Memory;
using App.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;
using System.Collections.Generic;

namespace App.Tests.Controllers
{
    public class MemoryControllerTests
    {
        private readonly Mock<IMemoryService> _mockService;
        private readonly MemoryController _controller;

        public MemoryControllerTests()
        {
            _mockService = new Mock<IMemoryService>();
            _controller = new MemoryController(_mockService.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(
            [
                new Claim("userId", "1")
            ], "mock"));
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };
        }

        [Fact]
        public async Task GetAllMemories_ShouldReturnOk_WithList()
        {
            var dummyList = new List<Memory> {
                new() { MemoryId = 1, MemoryText = "Deneme" }
            };
            _mockService.Setup(s => s.GetAllMemoriesAsync())
                        .ReturnsAsync(dummyList);

            var result = await _controller.GetAllMemories();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedList = Assert.IsType<List<Memory>>(okResult.Value);
            Assert.Single(returnedList);
        }

        [Fact]
        public async Task GetMemoryById_ShouldReturnOk_WhenAuthorized()
        {
            var memory = new Memory { MemoryId = 5, UserId = 1, MemoryText = "Bugün iyiyim" };
            _mockService.Setup(s => s.GetMemoryByIdAsync(5, 1))
                        .ReturnsAsync(memory);

            var result = await _controller.GetMemoryById(5);

            var ok = Assert.IsType<OkObjectResult>(result);
            var value = Assert.IsType<Memory>(ok.Value);
            Assert.Equal("Bugün iyiyim", value.MemoryText);
        }

        [Fact]
        public async Task GetMemoryById_ShouldReturnForbid_WhenUnauthorizedAccess()
        {
            _mockService.Setup(s => s.GetMemoryByIdAsync(10, 1))
                        .ThrowsAsync(new UnauthorizedAccessException("Yetkiniz yok."));

            var result = await _controller.GetMemoryById(10);

            var forbid = Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async Task GetMyMemories_ShouldReturnOk_WithUserMemories()
        {
            var list = new List<Memory> {
                new() { MemoryId = 1, UserId = 1, MemoryText = "Test" }
            };
            _mockService.Setup(s => s.GetMemoryByUserIdAsync(1))
                        .ReturnsAsync(list);

            var result = await _controller.GetMyMemories();

            var ok = Assert.IsType<OkObjectResult>(result);
            var memories = Assert.IsType<List<Memory>>(ok.Value);
            Assert.Single(memories);
        }

        [Fact]
        public async Task CreateMemory_ShouldReturnCreated_WhenValid()
        {
            var dto = new MemoryCreateDTO
            {
                UserId = 1,
                MemoryText = "Yeni gün",
                MemoryCreateDate = DateOnly.FromDateTime(DateTime.Now)
            };

            _mockService.Setup(s => s.CreateMemoryAsync(dto)).ReturnsAsync(42);

            var result = await _controller.CreateMemory(dto);

            var created = Assert.IsType<CreatedAtActionResult>(result);

            var json = System.Text.Json.JsonSerializer.Serialize(created.Value);
            using var doc = System.Text.Json.JsonDocument.Parse(json);
            var root = doc.RootElement;
            var newMemoryId = root.GetProperty("newMemoryId").GetInt32();

            Assert.Equal(42, newMemoryId);
        }

        [Fact]
        public async Task CreateMemory_ShouldReturnForbid_WhenDifferentUserId()
        {
            var dto = new MemoryCreateDTO { UserId = 99, MemoryText = "Yasak" };

            var result = await _controller.CreateMemory(dto);

            var forbid = Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async Task UpdateMemory_ShouldReturnOk_WhenUpdated()
        {
            var dto = new MemoryUpdateDTO { MemoryText = "Güncellendi" };

            _mockService.Setup(s => s.GetMemoryByIdAsync(5, 1))
                        .ReturnsAsync(new Memory { MemoryId = 5, UserId = 1 });

            var result = await _controller.UpdateMemory(5, dto);

            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Başarıyla güncellendi", ok.Value);
        }

        [Fact]
        public async Task UpdateFavoriteMemory_ShouldReturnOk_WhenToggled()
        {
            _mockService.Setup(s => s.GetMemoryByIdAsync(3, 1))
                        .ReturnsAsync(new Memory { MemoryId = 3, UserId = 1 });

            var result = await _controller.UpdateFavoriteMemory(3);

            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Başarıyla güncellendi", ok.Value);
        }

        [Fact]
        public async Task DeleteMemory_ShouldReturnNoContent_WhenDeleted()
        {
            _mockService.Setup(s => s.GetMemoryByIdAsync(2, 1))
                        .ReturnsAsync(new Memory { MemoryId = 2, UserId = 1 });

            var result = await _controller.DeleteMemory(2);

            Assert.IsType<NoContentResult>(result);
        }
    }
}

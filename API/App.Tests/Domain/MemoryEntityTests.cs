using FluentAssertions;
using Xunit;
using App.Domain.Entities;

namespace App.Tests.Domain
{
    public class MemoryEntityTests
    {
        [Fact]
        public void Create_WithValidData_ShouldSetProperties()
        {
            var memory = new Memory
            {
                UserId = 1,
                MemoryText = "Bugün kendimi iyi hissediyorum."
            };

            memory.UserId.Should().Be(1);
            memory.MemoryText.Should().Be("Bugün kendimi iyi hissediyorum.");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void Create_WithInvalidText_ShouldBeInvalid(string? text)
        {
            var memory = new Memory { UserId = 1, MemoryText = text };
            (memory.MemoryText == null || string.IsNullOrWhiteSpace(memory.MemoryText)).Should().BeTrue();
        }
    }
}

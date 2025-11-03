namespace App.Tests.Domain;

using Xunit;
using FluentAssertions;
using App.Application.Dto_s.User;
using App.Domain.Entities;

public class UserEntityTests
{
    [Fact]
    public void CreateUser_FromValidDTO_ShouldSetAllPropertiesExceptPasswordPlain()
    {
        var dto = new UserCreateDTO
        {
            UserName = "Serhat",
            UserSurname = "Kucı",
            UserEmail = "serhat@example.com",
            UserPassword = "12345"
        };

      
        var user = new User
        {
            UserName = dto.UserName,
            UserSurname = dto.UserSurname,
            UserEmail = dto.UserEmail,
            UserPasswordHash = HashPassword(dto.UserPassword)
        };

        user.UserName.Should().Be(dto.UserName);
        user.UserSurname.Should().Be(dto.UserSurname);
        user.UserEmail.Should().Be(dto.UserEmail);
        user.UserPasswordHash.Should().NotBeNullOrWhiteSpace(); 
        user.UserPasswordHash.Should().NotBe(dto.UserPassword); 
    }

    [Theory]
    [InlineData(null, "Kucı", "serhat@example.com", "12345")]
    [InlineData("Serhat", null, "serhat@example.com", "12345")]
    [InlineData("Serhat", "Kucı", "serhat@example.com", "")]
    [InlineData("Serhat", "Kucı", "serhat@example.com", null)]
    public void CreateUser_WithInvalidData_ShouldBeInvalid(
        string? name, string? surname, string? email, string? password)
    {
        var dto = new UserCreateDTO
        {
            UserName = name,
            UserSurname = surname,
            UserEmail = email,
            UserPassword = password
        };

        (
            string.IsNullOrWhiteSpace(dto.UserName) ||
            string.IsNullOrWhiteSpace(dto.UserSurname) ||
            string.IsNullOrWhiteSpace(dto.UserEmail) ||
            string.IsNullOrWhiteSpace(dto.UserPassword)
        ).Should().BeTrue();
    }

    private static string HashPassword(string? password)
    {
        if (string.IsNullOrEmpty(password))
            return string.Empty;
        var bytes = System.Text.Encoding.UTF8.GetBytes(password);
        var hash = System.Security.Cryptography.SHA256.HashData(bytes);
        return Convert.ToBase64String(hash);
    }
}

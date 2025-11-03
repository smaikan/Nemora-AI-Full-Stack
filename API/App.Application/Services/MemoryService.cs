using System.Text;
using System.Text.Json;
using App.Application.Contracts.Persistence;
using App.Application.Contracts.Services;
using App.Application.Dto_s.Memory;
using App.Application.Dto_s.User;
using App.Domain.Entities;
using Microsoft.Extensions.Configuration;


namespace App.Application.Services
{
    public class MemoryService : IMemoryService
    {
        private readonly IMemoryRepository _memoryRepository;
        private readonly HttpClient _httpClient;
        private readonly string _url;

        public MemoryService(IMemoryRepository memoryRepository, HttpClient httpClient, IConfiguration configuration)
        {
            _memoryRepository = memoryRepository;
            _httpClient = httpClient;
            _url = configuration["Gemini:Url"];
        }

        public async Task<List<Memory>> GetAllMemoriesAsync()
        {
            return await _memoryRepository.GetAllAsync();
        }

        public async Task<Memory> GetMemoryByIdAsync(int id, int userId)
        {
            var memory = await _memoryRepository.GetByIdAsync(id);
            if (memory == null)
                throw new KeyNotFoundException("Sayfa bulunamadı.");

            if (memory.UserId != userId)
                throw new UnauthorizedAccessException("Yetkiniz yok.");

            return memory;
        }


        public async Task<List<Memory>> GetMemoryByUserIdAsync(int userid)
        {
            return await _memoryRepository.GetByIdUserAsync(userid);
        }

        public async Task<int> CreateMemoryAsync(MemoryCreateDTO memorydto)
        {
            ArgumentNullException.ThrowIfNull(memorydto);

            if (string.IsNullOrWhiteSpace(memorydto.MemoryText))
                throw new ArgumentException("Memory text boş olamaz");

            var memos = await GetMemoryByUserIdAsync(memorydto.UserId) ?? [];
            bool exists = memos.Any(m => m.MemoryCreateDate == memorydto.MemoryCreateDate);

            if (exists) throw new Exception("Bu tarihte zaten bir kayıt var.");

            var analizResult = await AnalyzeTextAsync(memorydto.MemoryText);
            var memory = new Memory
            {
                UserId = memorydto.UserId,
                MemoryText = memorydto.MemoryText,
                MemoryCreateDate = memorydto.MemoryCreateDate,
                MemoryMood = analizResult.Mood,
                MemorySummary = analizResult.Summary,
                IsFavorite = false
            };

            await _memoryRepository.AddAsync(memory);
            return memory.MemoryId;
        }

        public async Task<GeminiResultDTO> AnalyzeTextAsync(string text)
        {

            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Testing")
            {
                return new GeminiResultDTO { Mood = 5, Summary = "Fake summary" };
            }

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new
                            {
                                text =
                              $"Sadece JSON döndür. Açıklama, yorum veya fazladan metin ekleme. " +
                              $"Format tam olarak şöyle olmalı: {{\"mood\": <0-10 arası sayı>, \"summary\": <kısa başlık>}}. " +
                              $"Metni analiz et: {text}. " +
                              $"Ruh haline göre 0-10 arasında 0 dahil değil 10 dahil gerçekçi bir mood puanı ver ve bunu 'mood' alanına yaz. " +
                              $"Ayrıca metnin anlamını özetleyen, 6 kelimeyi geçmeyen kısa bir başlık oluştur ve bunu 'summary' alanına yaz."


        }
    }
}
                }
            };

            var content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(_url, content);
            var json = await response.Content.ReadAsStringAsync();
            var outer = JsonDocument.Parse(json);
            var result = outer.RootElement
             .GetProperty("candidates")[0]
             .GetProperty("content")
             .GetProperty("parts")[0]
             .GetProperty("text")
             .GetString();



            if (string.IsNullOrWhiteSpace(result))
                return new GeminiResultDTO { Mood = 0, Summary = "Cevap boş döndü." };

            result = result.Replace("```json", "").Replace("```", "").Trim();

            int startIndex = result.IndexOf('{');
            int endIndex = result.LastIndexOf('}');
            if (startIndex != -1 && endIndex != -1 && endIndex > startIndex)
                result = result.Substring(startIndex, endIndex - startIndex + 1).Trim();

            try
            {
                var inner = JsonDocument.Parse(result);
                var mood = inner.RootElement.TryGetProperty("mood", out var moodProp)
                    ? moodProp.GetInt32()
                    : 0;

                var summary = inner.RootElement.TryGetProperty("summary", out var summaryProp)
                    ? summaryProp.GetString()
                    : "Özet bulunamadı.";

                return new GeminiResultDTO
                {
                    Mood = mood,
                    Summary = summary ?? "Özet boş."
                };
            }
            catch
            {
                return new GeminiResultDTO
                {
                    Mood = 0,
                    Summary = "Özet bulunamadı. []"
                };
            }
        }

        public async Task UpdateMemoryAsync(int id, MemoryUpdateDTO memorydto)
        {
            var memory = await _memoryRepository.GetByIdAsync(id);
            if (memory == null)
                throw new Exception("Memory not found");

            memory.MemoryText = memorydto.MemoryText;
            memory.MemoryUpdateDate = DateOnly.FromDateTime(DateTime.Now);
            await _memoryRepository.UpdateAsync(memory);
        }

        public async Task UpdateFavoriteMemoryAsync(int id)
        {
            var memory = await _memoryRepository.GetByIdAsync(id);
            if (memory == null)
                throw new Exception("Memory not found");

            memory.IsFavorite = !memory.IsFavorite;

            await _memoryRepository.UpdateAsync(memory);
        }

        public async Task DeleteMemoryAsync(int id, int userid)
        {
            var memory = await _memoryRepository.GetByIdAsync(id) ?? throw new Exception("Memory not found");
            if (memory.UserId != userid) { throw new Exception("Silmeye yetkiniz yok"); }

            await _memoryRepository.DeleteAsync(memory);

        }
    }
}

# Nemora Diary

Nemora Diary, ASP.NET Core Web API ile React + TypeScript ön yüzünü birleştiren dijital günlük platformudur. Kullanıcılar günlük anılarını kaydedebilir, yapay zekâ tarafından oluşturulan ruh hâli skorları ve özetler alabilir, geçmişlerini veri görselleştirmeleriyle inceleyebilir.

## Proje Yapısı

| Yol | Açıklama |
| ---- | ----------- |
| `API/` | Web API'yi (`App.API`), uygulama servislerini, domain modellerini, kalıcılık katmanını ve otomatik testleri barındıran .NET 9 çözümü. |
| `UI/` | API'yi tüketip günlük deneyimini sunan React (Vite) tek sayfa uygulaması. |

## Ana Özellikler

- Günlük kayıtlarını yönetmek için kayıt, giriş ve JWT ile korunan uç noktalar. API, Entity Framework Core ve SQL Server kullanır ve doğrulanan çağrılar için token üretir.
- Bir anı kaydederken yapay zekâ desteği: Arka uç, Gemini servisinden kısa bir özet ve 0–10 arası ruh hâli skoru üretir.
- Son ruh hâllerini grafiğe döken, haftalık trendleri vurgulayan ve son anıları listeleyen analiz panosu.
- Taslak otomatik kaydı, tarih uygunluğu ipuçları ve favori işaretleme seçenekleri olan günlük düzenleyici.

## Ön Koşullar

- [.NET SDK 9.0]
- [Node.js 20+] ve npm
- API tarafından erişilebilen bir SQL Server örneği
- Ruh hâli analizi için bir Google Gemini API anahtarı

## Arka Uç Kurulumu (`API/`)

1. Bağımlılıkları yükleyip paketleri geri yükleyin:
   ```bash
   cd API
   dotnet restore
   ```

3. SQL Server veritabanını hazırlamak için migrasyonları uygulayın:
   ```bash
   dotnet ef database update --project App.Persistence --startup-project App.API
   ```
4. Web API'yi çalıştırın:
   ```bash
   dotnet run --project App.API
   ```
   API varsayılan olarak `https://localhost:5017` ve `http://localhost:5016` üzerinde çalışır. Geliştirmede `/swagger` altında Swagger UI erişilebilir.

### Back-end Testleri

Tüm otomatik testleri (birim, entegrasyon, performans) çalıştırmak için:
```bash
dotnet test Nemora.sln
```

## Front-end Kurulumu (`UI/`)

1. JavaScript bağımlılıklarını yükleyin:
   ```bash
   cd UI
   npm install
   ```
2. Back-end farklı bir yerde barındırılıyorsa `src/Components/API.ts` dosyasındaki API temel URL'sini güncelleyin.
3. Geliştirme sunucusunu başlatın:
   ```
   npm run dev
   ```
   (varsayılan `http://localhost:5173`)


## Kimlik Doğrulama Akışı

1. `POST /api/User` (e-posta + şifre) ile kullanıcı oluşturun. Şifreler BCrypt hash'i olarak saklanır.
2. `POST /api/User/login` ile giriş yapıp JWT alın. Ön yüz token'ı `localStorage` içinde tutar ve Axios interceptors aracılığıyla sonraki isteklere ekler.
3. Kimliği doğrulanmış kullanıcılar şu korumalı uç noktaları kullanabilir:
   - `GET /api/User/loggeduser` – profili ve anıları getirir.
   - `POST /api/Memory` – yeni anı oluşturur (Gemini sonuçlarıyla otomatik zenginleştirilir).
   - `PUT /api/Memory/{id}` ve `DELETE /api/Memory/{id}` – kayıtları günceller veya siler.

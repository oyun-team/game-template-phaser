# Oyun şablonu: Phaser (2D)

*English below.*

Bu şablonla yaptığın oyun, Oyun Takımı sitesinde yayınlanır. Telefonda da bilgisayarda da çalışmalı.

[Phaser](https://phaser.io), 2D oyunlar için hazır bir oyun motorudur: sahneler, sprite'lar, animasyon, fizik, ses ve dokunmatik kontroller hazır gelir. Phaser 4.2.1 `game/phaser.min.js` dosyasında repoya eklenmiştir; internetten indirmen gerekmez.

- Belgeler: https://docs.phaser.io
- Örnekler: https://phaser.io/examples

## Başlarken
1. Bu sayfada **Use this template → Create a new repository** de. Repoyu kendi hesabında **Private** olarak oluştur.
   **Repo adı kuralı (zorunlu):** `adın_soyadın-oyunun_adı`. Örnek: Berfin Toprak'ın Gece Lambası oyunu `berfin_toprak-gece_lambasi`. Hepsi küçük harf; Türkçe harfleri sadeleştir (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u); kelimeler arasına `_`, adınla oyunun adı arasına tek bir `-` koy. Böylece hangi oyunu kimin yaptığı görülür. Repo adı sitede görünmez; oyunun adresi `game.json`'daki `slug`'dır (örn. `gece-lambasi`).
2. Repo ayarlarından (**Settings → Collaborators**) asistanını collaborator olarak ekle.
3. `game.json` dosyasını doldur: `slug` (oyunun adresi, örn. `uzay-kosusu`), `title`, `author` (takma adın; gerçek adını yazmak zorunda değilsin), `category`, `orientation`.
   İstersen oyunun kimler için olduğunu da yaz; oyun sayfasında görünür: `age` (önerilen en küçük yaş: 3, 7, 12, 16 veya 18), `audience` (kimler için), `benefits` (oynayana ne kazandırır) ve `skills` (en fazla 4 beceri: `reflexes`, `focus`, `coordination`, `timing`, `logic`, `strategy`, `planning`, `spatial`, `memory`, `patience`). Kategoriler: `arcade`, `puzzle`, `action`, `adventure`, `strategy`, `sports`, `racing`, `board`, `educational`, `other`.
4. Oyununu `game/` klasöründe yaz. `game/main.js` bir örnek oyun (Yıldız Yakala); onu değiştirip kendi oyununu yazabilirsin. Resim ve sesleri `game/assets/` klasörüne koy. `game/index.html` mutlaka olmalı.

## Bilgisayarında denemek
Oyunu bir yerel sunucuyla aç, örneğin:
```
npx serve game
```
ya da VS Code'da **Live Server** eklentisiyle `game/index.html`'i aç. Telefon görünümü için tarayıcıda geliştirici araçlarını açıp cihaz modunu kullan.
Doğrudan açıldığında oyun **önizleme modunda** çalışır: skorlar sadece senin tarayıcında tutulur. Adrese `?lang=en` ekleyerek İngilizceyi, `?player=Ali` ekleyerek giriş yapmış bir oyuncuyu deneyebilirsin.

Göndermeden önce kontrol et:
```
node scripts/check.mjs
```

## Siteyle konuşmak: OyunSDK
`oyun-sdk.js` ve `phaser.min.js` dosyalarını değiştirme; `index.html`'de oyun kodundan önce yüklenmeli.
```js
OyunSDK.getLanguage();             // "tr" veya "en"
await OyunSDK.getPlayer();         // { nickname } ya da giriş yapılmadıysa null
await OyunSDK.submitScore(42);     // oyun bitince skoru gönder → { saved, best }
OyunSDK.onPause(() => { ... });    // oyuncu sekmeyi değiştirdi: oyunu durdur
OyunSDK.onResume(() => { ... });
```
Skor kullanmıyorsan `game.json`'da `"scores": false` yap.

## Kurallar
- Her şey `game/` klasöründe olmalı; dışarıdan (CDN, başka site) dosya yükleme.
- Toplam boyut en fazla 60 MB.
- Dokunmatik ekranda oynanabilmeli (`pointerdown` gibi pointer olaylarını kullan).
- Uygunsuz içerik yok; site herkese açık.

## Teslim
Oyun bitince repoyu asistanına transfer et (**Settings → Danger Zone → Transfer**). Repo `oyun-team` organizasyonuna taşındıktan sonra, `main`'e her push oyunu otomatik yayınlar. İlk yayın asistan onayladıktan sonra görünür.

Yayın sonucunu GitHub'da son commit'in yanındaki işarette görürsün: ✓ ya da ✗ (**oyun-team / yayın**; üzerine gelince mesajı okunur). GitHub Actions kullanılmaz; site her push'u kendisi alır.

Transfer yapamıyorsan, oyun bir fork ise, dal adı `main` değilse ya da push'tan sonra işaret çıkmıyorsa: [AGENTS.md](AGENTS.md) dosyasının 2. bölümü her durumu adım adım anlatır. Bir yapay zekâ kod asistanı kullanıyorsan ona "AGENTS.md'ye göre oyunu oyun-team'e taşı" demen yeterli.

---

# Game template: Phaser (2D)

Games made from this template are published on the Oyun Team site. They must work on phones and computers.

[Phaser](https://phaser.io) is a ready-made 2D game engine with scenes, sprites, animation, physics, sound and touch input. Phaser 4.2.1 is included as `game/phaser.min.js`, so nothing needs downloading. Docs: https://docs.phaser.io, examples: https://phaser.io/examples.

**Getting started:** click **Use this template**, create a **private** repo on your account named `firstname_lastname-game_name` (a strict rule, so we can see who made what: for example `berfin_toprak-gece_lambasi`; lowercase, Turkish letters made plain, `_` between words, one `-` between your name and the game; details in section 2.9 of [AGENTS.md](AGENTS.md)), and add your TA as a collaborator. Fill in `game.json` (`slug`, `title`, `author` as a nickname, `category`, `orientation`); optionally also `age` (3, 7, 12, 16 or 18), `audience` and `benefits` (who it suits and what it helps with, in `tr`/`en`) and up to 4 `skills`, which show on the game page, and write your game in `game/` (`game/main.js` is an example game, Catch the Stars, that you can replace; put pictures and sounds in `game/assets/`; `game/index.html` is required).

**Testing:** run `npx serve game` (or VS Code Live Server). Opened directly, the game runs in **preview mode**, with scores kept only in your browser. Add `?lang=en` or `?player=Ali` to the address to test those cases. Run `node scripts/check.mjs` before handing in.

**OyunSDK:** see the code block above; `submitScore` when a round ends, `onPause`/`onResume` to pause, `getLanguage` for text. Don't edit `oyun-sdk.js` or `phaser.min.js`.

**Rules:** everything inside `game/`, no external files, 60 MB max, playable with touch, nothing inappropriate.

**Handing in:** transfer the repo to your TA. Once it is in `oyun-team`, every push to `main` publishes automatically; the first release appears after the TA approves it. The result shows as a ✓ or ✗ (**oyun-team / yayın**) next to the latest commit on GitHub; no GitHub Actions run, the site picks up each push itself. If you can't transfer, the repo is a fork, the branch isn't `main`, or no mark appears after a push, section 2 of [AGENTS.md](AGENTS.md) covers every case step by step; an AI coding assistant can follow it for you ("move this game into oyun-team following AGENTS.md").

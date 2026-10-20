# Ölçüm rehberi / Measuring guide

*English below.*

Bu rehber oyun yapan herkes için (öğrenciler, yapımcılar ve yapay zekâ kod asistanları). Dört şablonda da aynıdır.

## Neden ölçüyoruz?

Site, ailelere çocuklarının bir oyunda zamanla nasıl geliştiğini gösterir. Örnek: "Ela bu hafta 40 dakika refleks çalıştı ve bu oyunlarda hızlandı."

- Çocuk **sadece kendi önceki oyunlarıyla** karşılaştırılır. Başka çocuklarla asla karşılaştırılmaz, sıralanmaz, not verilmez.
- **Skor bunu gösteremez.** Skor şansa, zorluğa ve oyunun ne kadar sürdüğüne bağlıdır. Bu yüzden oyun, her denemede çocuğun kendi yaptığı **tek bir şeyi** ölçer: bir dokunuşun hızı, vurulan hedeflerin oranı, bir dizide yapılan hata.
- **Skor ve liderlik tablosu aynen devam eder.** Ölçüm skora eklenir, onun yerini almaz. Oyun bitince `submitScore` yine çağrılır.

## Üç adım

1. **Seç:** Aşağıdaki katalogdan oyununa uyan 1 ile 3 arası ölçüm seç.
2. **Yaz:** `game.json`'a `measures` listesini ekle. Her ölçümün `skill`'i oyunun `skills` listesinde de olmalı.
   ```json
   "skills": ["reflexes", "focus"],
   "measures": [
     { "id": "reaction_ms", "skill": "reflexes", "unit": "ms", "better": "lower", "label": { "tr": "Tepki süresi", "en": "Reaction time" } },
     { "id": "hit_rate", "skill": "focus", "unit": "percent", "better": "higher", "label": { "tr": "Vurulan hedef", "en": "Targets hit" } }
   ]
   ```
3. **Gönder:** Her denemede bir kez çağır.
   - JavaScript (JS, Phaser, Three.js): `OyunSDK.measure("reaction_ms", 420)`
   - Godot: `Oyun.measure("reaction_ms", 420.0)`
   - Zorluk değişiyorsa üçüncü değer seviyedir: `OyunSDK.measure("reaction_ms", 420, 2)`.

Sonra `node scripts/check.mjs` çalıştır. Yanlış yazılmış bir ölçüm varsa söyler.

## Ölçüm kataloğu

Katalogdaki ölçümler bütün oyunlarda aynı anlama gelir. Böylece site, örneğin "refleks"i birkaç oyunda birlikte gösterebilir. Katalogdaki bir `id`'yi kullanırsan `skill`, `unit` ve `better` bu tablodakiyle aynı olmalı (kontrol bunu denetler). `label`'ı oyununa göre yazabilirsin.

| `id` | Beceri (`skill`) | Birim (`unit`) | Daha iyi (`better`) | Bir deneme | Örnek |
|---|---|---|---|---|---|
| `reaction_ms` | `reflexes` | `ms` | `lower` | Bir hedefin tamamen görünmesinden çocuğun ona dokunmasına kadar geçen süre | Balon Patlat, Hedef Avcısı |
| `hit_rate` | `focus` | `percent` | `higher` | Bir turda kaybolmadan vurulan hedeflerin yüzdesi | Hedef Avcısı |
| `avoid_rate` | `focus` | `percent` | `higher` | Bir turda dokunulmaması gereken şeylerden (bomba, kaya) uzak durulanların yüzdesi | Yıldız Yakala, Uzay Yolu |
| `tap_accuracy` | `coordination` | `percent` | `higher` | Bir turda bir hedefe isabet eden dokunuşların yüzdesi | Balon Patlat |
| `catch_rate` | `coordination` | `percent` | `higher` | Bir turda ya da bölümde yakalanan hareketli şeylerin yüzdesi | Yıldız Yakala, Tuğla Kır |
| `lives_lost` | `coordination` | `count` | `lower` | Bir bölüm oynanırken kaybedilen can (çarpma, düşme, düşmana değme), bölüm bitene ya da oyun bitene kadar | Tilki Macerası |
| `timing_accuracy` | `timing` | `percent` | `higher` | Doğru ana ya da yere ne kadar yakın: 100 tam zamanında, 0 ıskaladı | Flappy Kuş |
| `beat_error_ms` | `rhythm` | `ms` | `lower` | Bir dokunuşun müziğin vuruşundan kaç milisaniye uzak olduğu | (ritim oyunları) |
| `placement_accuracy` | `spatial` | `percent` | `higher` | Bir parçanın hedef yere ne kadar oturduğu: 100 tam üstüne | Kule |
| `memory_span` | `memory` | `count` | `higher` | Bir turda doğru hatırlanan en uzun dizi (öğe sayısı) | (hafıza oyunları) |
| `extra_moves` | `planning` | `count` | `lower` | Bir bulmacada en az hamleden fazla yapılan hamle sayısı | (bulmacalar) |
| `retries` | `planning` | `count` | `lower` | Bir bulmaca ya da bölüm çözülene kadar başarısız biten deneme sayısı | Gece Lambası |
| `win_rate` | `strategy` | `percent` | `higher` | Bilgisayara karşı bir oyun: kazanınca 100, berabere 50, kaybedince 0 | Pentago |
| `blunders` | `strategy` | `count` | `lower` | Bilgisayara karşı bir oyunda yapılan hata: tek hamlede kazanmayı kaçırmak ya da önlenebilecekken rakibe tek hamlede kazanma fırsatı bırakmak | Pentago |
| `solve_ms` | `logic` | `ms` | `lower` | Bir bulmacanın çözülme süresi | (bulmacalar) |
| `early_actions` | `patience` | `count` | `lower` | Bir turda doğru an gelmeden yapılan acele hareket sayısı | (bekleme oyunları) |

`patience`, `memory`, `rhythm` ve `logic` gibi becerilerin henüz örnek oyunu yok. Bunları çalıştıran bir oyun yapıyorsan bu ölçümler hazır.

**Katalogda olmayan bir ölçüm** de yazabilirsin (örneğin `jump_accuracy`). Kontrol bunu kabul eder ama uyarır: site onu sadece o oyunun kendi grafiğinde gösterebilir, beceri özetine katamaz. Önce katalogdan seçmeyi dene.

## Seviye (zorluk)

Oyunun zorlaşıyorsa (hedefler hızlanıyor, bölüm değişiyor, bilgisayar güçleniyor) her denemeyle birlikte **seviyeyi** gönder: 1, 2, 3... Site sadece **aynı seviyedeki** denemeleri karşılaştırır. Yoksa çocuk 3. bölümde daha yavaş göründüğü için "geriledi" sanılır.

- Seviye, denemenin **oynandığı** zorluktur (örneğin hedef çıktığı andaki zorluk).
- Zorluk hiç değişmiyorsa seviyeyi gönderme.
- Az sayıda seviye kullan (1 ile 5 arası iyidir). Her küçük hız artışı yeni bir seviye olmasın.

## Site ne gösterir?

Site bu bilgileri aile sayfasında şöyle kullanacak:

- Çocuğun ilk birkaç oyunu onun **başlangıç** düzeyidir. Sonraki haftalar bununla karşılaştırılır.
- `ms` ve `count` ölçümlerinde ortanca (medyan), `percent` ölçümlerinde ortalama alınır. Böylece tek bir şanslı ya da şanssız deneme sonucu değiştirmez.
- Yeterli deneme yoksa hiçbir şey gösterilmez ("biraz daha oynayınca burada görünecek").
- Yazılar dikkatlidir: "bu oyunlarda hızlandı" denir, "dikkati güçlü" denmez.

## İyi ölçüm kuralları

1. **Skoru ölçme.** Skor zaten gönderiliyor. Çocuğun kontrol ettiği tek bir şeyi ölç.
2. **Şansı ölçme.** Rastgele gelen bir bonus ya da kolay bir dizilim ölçülmez.
3. **Duraklamayı sayma.** Kendi oyun saatini tut ve sadece oyun oynanırken ilerlet. `performance.now()` duraklarken de ilerler; süre ölçmek için kullanma.
4. **Öğretirken ölçme.** Oyun kuralları gösterirken, geri sayımda ya da "hazır" ekranında ölçüm gönderme.
5. **Çok kısa turları atla.** Yüzde ölçümlerinde en az 5 olay (dokunuş, hedef, bomba) olmayan turu gönderme. 2 hedeften 1'i %50 demek değildir.
6. **Bir deneme, bir çağrı.** Aynı denemeyi iki kez gönderme. Bir turu ölçüyorsan tur bitince bir kez çağır.
7. **Görünmeden saymaya başlama.** Tepki süresi, hedef ekranda **tamamen** göründüğü anda başlar.
8. **Küçük çocukları düşün.** Hedefler büyük olsun; ölçüm, ekranın küçüklüğünü değil çocuğun becerisini ölçsün.
9. **Başarısız denemeleri de say.** Bir deneme başarısız olabiliyorsa (çarpma, kaybetme, ıskalama) sadece başarılı olanları gönderme. Iskalanan bir hedef 0 puandır; kaybedilen bir bölümün hataları da sayılır. Yoksa çocuk olduğundan iyi görünür.
10. **Hatayı da ölç.** Doğruluk ya da hız yanında, oyunda hata yapılabiliyorsa bir hata sayısı da düşün (`lives_lost`, `blunders`, `retries`, `extra_moves`, `early_actions`). Sayı ölçümlerini (`count`) hep aynı büyüklükte bir parça için gönder: bir bölüm, bir oyun ya da bir bulmaca. Bölümler birbirinden farklıysa seviyeyi de gönder.

## Yasaklar

- Oyun dışında hiçbir şey ölçme: kamera, mikrofon, konum, yazılan metin, cihaz bilgisi yok.
- Çocuğun adını, yaşını ya da başka bir bilgisini ölçüme koyma. Ölçüm sadece bir sayıdır.
- "Dikkati artırır", "zekâyı geliştirir", "kanıtlanmış" gibi sözler yazma. Oyunun neyi **çalıştırdığını** yaz: "hızlı tepki vermeyi çalıştırır".
- `oyun-sdk.js` ve `scripts/check.mjs` dosyalarını değiştirme.

## Denemek

- Oyunu bilgisayarında açınca (önizleme modu) her ölçüm tarayıcı konsoluna yazılır. Skor gönderilince ekrandaki mesaj ölçümlerin ortancasını da gösterir: `reaction_ms ~410 (12)`.
- Godot'ta ölçümler editörün çıktı panelinde görünür.
- `node scripts/check.mjs` `measures` listesini denetler. Ölçüm yoksa uyarır: aile sadece oyun süresini görür.

## Örnek kod

JavaScript: hedef göründüğünde oyun saatini kaydet, dokunulunca farkı gönder.

```js
let clock = 0; // sadece oyun oynanırken ilerler
function update(dt) {
  if (paused || state !== "playing") return;
  clock += dt;
  for (const target of targets) {
    if (target.seenAt === null && isFullyVisible(target)) target.seenAt = clock;
  }
}
function onTargetTapped(target) {
  if (target.seenAt !== null) OyunSDK.measure("reaction_ms", (clock - target.seenAt) * 1000, level);
}
function endRound() {
  if (shown >= 5) OyunSDK.measure("hit_rate", (hit / shown) * 100, level);
  OyunSDK.submitScore(score); // skor ve liderlik tablosu aynen devam eder
}
```

Godot:

```gdscript
var clock := 0.0
func _process(delta: float) -> void:
	if state == "playing":
		clock += delta # site oyunu durdurunca _process de durur
func _on_target_tapped(target: Dictionary) -> void:
	Oyun.measure("reaction_ms", (clock - target["born"]) * 1000.0, level)
```

Şablondaki örnek oyun tam bir örnektir; ona bak.

---

# Measuring guide

This guide is for everyone who makes games: students, makers and AI coding assistants. It is the same in all four templates.

## Why we measure

The site shows parents how their child improves in a game over time. For example: "Ela practised reflexes for 40 minutes this week and got faster in these games."

- A child is compared **only with their own earlier play**. Never with other children: no rankings, no grades.
- **A score can't show this.** It depends on luck, difficulty and how long the game lasted. So each game measures **one thing the child does** on each try: how fast a tap was, the share of targets hit, the mistakes in a sequence.
- **Scores and leaderboards stay exactly as they are.** Measures come on top of the score, not instead of it. Keep calling `submitScore` when a game ends.

## Three steps

1. **Pick** 1 to 3 measures from the catalog below that fit your game.
2. **Declare** them in `game.json` → `measures`. Each measure's `skill` must also be in the game's `skills` (see the example in the Turkish part above).
3. **Report** each try once:
   - JavaScript (JS, Phaser, Three.js): `OyunSDK.measure("reaction_ms", 420)`
   - Godot: `Oyun.measure("reaction_ms", 420.0)`
   - When the difficulty changes, the third value is the level: `OyunSDK.measure("reaction_ms", 420, 2)`.

Then run `node scripts/check.mjs`. It tells you if a measure is written wrong.

## The measure catalog

Catalog measures mean the same thing in every game, so the site can, for example, show "reflexes" across several games together. If you use a catalog `id`, its `skill`, `unit` and `better` must match this table (the check enforces it). Write the `label` to suit your game.

| `id` | `skill` | `unit` | `better` | One try | Example |
|---|---|---|---|---|---|
| `reaction_ms` | `reflexes` | `ms` | `lower` | Time from a target being fully visible to the child tapping it | Pop the Balloons, Target Hunter |
| `hit_rate` | `focus` | `percent` | `higher` | Share of targets hit in a round before they vanished | Target Hunter |
| `avoid_rate` | `focus` | `percent` | `higher` | Share of "don't touch" things (bombs, rocks) left alone in a round | Catch the Stars, Space Road |
| `tap_accuracy` | `coordination` | `percent` | `higher` | Share of taps in a round that landed on a target | Pop the Balloons |
| `catch_rate` | `coordination` | `percent` | `higher` | Share of moving things caught in a round or level | Catch the Stars, Brick Breaker |
| `lives_lost` | `coordination` | `count` | `lower` | Lives lost while playing one level (a crash, a fall, touching an enemy), until the level is cleared or the game ends | Fox Adventure |
| `timing_accuracy` | `timing` | `percent` | `higher` | How close to the right moment or spot: 100 exactly on time, 0 a miss | Flappy Bird |
| `beat_error_ms` | `rhythm` | `ms` | `lower` | How many ms a tap was off the music's beat | (rhythm games) |
| `placement_accuracy` | `spatial` | `percent` | `higher` | How well a piece landed on its target: 100 exactly on top | Tower |
| `memory_span` | `memory` | `count` | `higher` | Longest sequence recalled correctly in a round (number of items) | (memory games) |
| `extra_moves` | `planning` | `count` | `lower` | Moves beyond the fewest needed to solve a puzzle | (puzzles) |
| `retries` | `planning` | `count` | `lower` | Failed tries before a puzzle or level was solved | Night Lamp |
| `win_rate` | `strategy` | `percent` | `higher` | One game against the computer: 100 for a win, 50 for a draw, 0 for a loss | Pentago |
| `blunders` | `strategy` | `count` | `lower` | Mistakes in one game against the computer: missing a win in one move, or leaving the opponent a win in one move when it could be avoided | Pentago |
| `solve_ms` | `logic` | `ms` | `lower` | Time to solve one puzzle | (puzzles) |
| `early_actions` | `patience` | `count` | `lower` | Hasty actions in a round before the right moment came | (waiting games) |

`patience`, `memory`, `rhythm` and `logic` have no example game yet. If you make one that practises them, these measures are ready.

**A measure outside the catalog** (for example `jump_accuracy`) is allowed. The check accepts it with a warning: the site can only show it on that game's own chart, not in the skill summary. Try the catalog first.

## Levels (difficulty)

If your game gets harder (targets speed up, levels change, the computer gets stronger), send the **level** with each try: 1, 2, 3... The site compares only tries at the **same level**. Otherwise a child would look "worse" just for reaching level 3.

- The level is the difficulty the try was **played at** (for example, the difficulty when the target appeared).
- If the difficulty never changes, leave the level out.
- Use few levels (1 to 5 is good). Don't make every small speed-up a new level.

## What the site shows

The site will use this data on the family page like this:

- A child's first few games set their **starting point**. Later weeks are compared with it.
- It takes the median of `ms` and `count` measures and the average of `percent` measures, so one lucky or unlucky try doesn't change the picture.
- With too few tries it shows nothing ("play a bit more and it appears here").
- The wording is careful: "got faster in these games", never "has strong attention".

## Rules for good measures

1. **Don't measure the score.** It is already sent. Measure one thing the child controls.
2. **Don't measure luck.** A random bonus or an easy layout isn't a measure.
3. **Don't count paused time.** Keep your own game clock that only runs while playing. `performance.now()` keeps running during a pause; don't use it for times.
4. **Don't measure while teaching.** No measures during a tutorial, a countdown or the "ready" screen.
5. **Skip very short rounds.** For percent measures, don't send a round with fewer than 5 events (taps, targets, bombs). 1 hit out of 2 targets isn't really 50%.
6. **One try, one call.** Don't send the same try twice. If you measure a round, call once when it ends.
7. **Start timing when it is visible.** Reaction time starts when the target is **fully** on screen.
8. **Think of small children.** Keep targets big, so the measure shows the child's skill, not how small the screen is.
9. **Count the failures too.** If a try can fail (a crash, a loss, a miss), don't send only the successful ones. A missed target scores 0, and a lost level's mistakes still count. Otherwise the child looks better than they are.
10. **Measure mistakes as well.** Next to accuracy or speed, if a game has mistakes, consider a mistake count too (`lives_lost`, `blunders`, `retries`, `extra_moves`, `early_actions`). Send `count` measures for a unit of the same size every time: one level, one game or one puzzle. If levels differ, send the level too.

## Never

- Measure anything outside play: no camera, microphone, location, typed text or device details.
- Put the child's name, age or any other detail into a measure. A measure is only a number.
- Write claims like "improves attention", "makes you smarter" or "proven". Say what the game **practises**: "practises reacting quickly".
- Edit `oyun-sdk.js` or `scripts/check.mjs`.

## Testing

- Opened on your computer (preview mode), every measure is written to the browser console. When a score is sent, the message on screen also shows each measure's median: `reaction_ms ~410 (12)`.
- In Godot, measures show in the editor's output panel.
- `node scripts/check.mjs` checks the `measures` list, and warns when there is none: then parents only see play time.

## Example code

See the code in the Turkish part above (JavaScript and Godot). The template's example game is a complete example.

// Örnek oyun: Yıldız Yakala. Bu dosyayı kendi oyununla değiştir.
// Example game: Catch the Stars. Replace this file with your own game.
// Phaser docs / belgeler: https://docs.phaser.io  Examples / örnekler: https://phaser.io/examples

const TEXT = {
  tr: { start: "Başlamak için dokun", score: "Skor", lives: "Can", over: "Oyun bitti!", best: "En iyi", again: "Tekrar oynamak için dokun", hint: "Sepeti sürükle, yıldızları yakala, bombalardan kaç" },
  en: { start: "Tap to start", score: "Score", lives: "Lives", over: "Game over!", best: "Best", again: "Tap to play again", hint: "Drag the basket, catch stars, dodge bombs" },
};
const t = TEXT[OyunSDK.getLanguage()] || TEXT.tr;
const FONT = { fontFamily: "system-ui, sans-serif", fontStyle: "bold", color: "#ffffff" };

// A scene is one screen of your game. Phaser calls preload, create, then update every frame.
class PlayScene extends Phaser.Scene {
  constructor() {
    super("play");
  }

  preload() {
    // Real games load pictures and sounds here, e.g. this.load.image("star", "assets/star.png").
    // Dosyaları game/assets klasörüne koy ve burada yükle.
  }

  create() {
    this.makeTextures();
    const { width, height } = this.scale;
    this.unit = Math.min(width, height) / 20;

    this.basket = this.physics.add.image(width / 2, height - this.unit * 3, "basket").setImmovable(true);
    this.basket.body.allowGravity = false;
    this.items = this.physics.add.group();
    this.physics.add.overlap(this.basket, this.items, (_basket, item) => this.catchItem(item));

    this.scoreText = this.add.text(16, 16, "", { ...FONT, fontSize: this.unit + "px" });
    this.livesText = this.add.text(width - 16, 16, "", { ...FONT, fontSize: this.unit + "px" }).setOrigin(1, 0);
    this.message = this.add.text(width / 2, height / 2, "", { ...FONT, fontSize: this.unit * 1.3 + "px", align: "center", wordWrap: { width: width * 0.9 } }).setOrigin(0.5);

    // Pointer events work for both touch and mouse.
    this.input.on("pointerdown", (p) => {
      if (this.state !== "playing") this.startRound();
      this.basket.x = p.x;
    });
    this.input.on("pointermove", (p) => {
      if (p.isDown && this.state === "playing") this.basket.x = Phaser.Math.Clamp(p.x, 0, this.scale.width);
    });

    // The site tells the game when the player switches tabs or locks the phone.
    OyunSDK.onPause(() => { this.physics.pause(); this.time.paused = true; });
    OyunSDK.onResume(() => { this.physics.resume(); this.time.paused = false; });

    this.state = "start";
    this.message.setText(t.start + "\n\n" + t.hint);
  }

  // Draws simple shapes into textures so the example needs no image files.
  makeTextures() {
    if (this.textures.exists("star")) return;
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0xffd23f);
    g.fillPoints(starPoints(24, 24, 24, 10), true);
    g.generateTexture("star", 48, 48);
    g.clear();
    g.fillStyle(0xff5d73);
    g.fillCircle(20, 22, 18);
    g.fillStyle(0xffffff);
    g.fillRect(17, 0, 6, 8);
    g.generateTexture("bomb", 40, 40);
    g.clear();
    g.fillStyle(0x4cc9f0);
    g.fillRoundedRect(0, 0, 120, 28, 10);
    g.generateTexture("basket", 120, 28);
    g.destroy();
  }

  startRound() {
    this.items.clear(true, true);
    this.score = 0;
    this.lives = 3;
    this.state = "playing";
    this.message.setText("");
    this.updateHud();
    if (this.spawner) this.spawner.remove();
    this.spawner = this.time.addEvent({ delay: 700, loop: true, callback: () => this.spawn() });
  }

  spawn() {
    const isBomb = Math.random() < 0.25;
    const x = Phaser.Math.Between(30, this.scale.width - 30);
    const item = this.items.create(x, -30, isBomb ? "bomb" : "star");
    item.isBomb = isBomb;
    item.setVelocityY(this.scale.height * (0.3 + Math.min(this.score, 40) * 0.01));
    item.setAngularVelocity(Phaser.Math.Between(-120, 120));
  }

  catchItem(item) {
    if (this.state !== "playing") return;
    item.destroy();
    if (item.isBomb) {
      this.lives--;
      this.cameras.main.shake(150, 0.01);
      if (this.lives <= 0) this.endRound();
    } else {
      this.score++;
    }
    this.updateHud();
  }

  async endRound() {
    this.state = "over";
    this.spawner.remove();
    this.items.setVelocityY(0);
    this.message.setText(`${t.over}\n${t.score}: ${this.score}\n\n${t.again}`);
    try {
      const result = await OyunSDK.submitScore(this.score);
      this.message.setText(`${t.over}\n${t.score}: ${this.score}\n${t.best}: ${result.best}\n\n${t.again}`);
    } catch (err) {
      console.warn(err);
    }
  }

  updateHud() {
    this.scoreText.setText(`${t.score}: ${this.score}`);
    this.livesText.setText(`${t.lives}: ${this.lives}`);
  }

  update() {
    // Remove things that fell off the bottom of the screen.
    for (const item of this.items.getChildren().slice()) {
      if (item.y > this.scale.height + 40) item.destroy();
    }
  }
}

function starPoints(cx, cy, outer, inner) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? inner : outer;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    points.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }
  return points;
}

const game = new Phaser.Game({
  type: Phaser.AUTO, // WebGL when the phone has it, otherwise canvas
  backgroundColor: "#1b1730",
  scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
  physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
  scene: [PlayScene],
});

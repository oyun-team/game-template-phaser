# AGENTS.md: Phaser (2D) game template

This repo is an oyun-team game template, or a game made from one. Games made from it are published on the oyun-team game site (https://games.selimhantokat.com) and play on phones and computers inside a sandboxed frame.

The README is for humans (Turkish first, English below). This file is for AI coding agents. Read it all before changing anything, and read section 2 before any move, transfer or hand-in. Every game repo must be named `<maker>-<game>` (for example `berfin_toprak-gece_lambasi`): a strict rule, see 2.9.

The people using this template are often not developers. Explain what you do in plain words, and ask before anything that changes a GitHub account or repo settings.

Template: https://github.com/oyun-team/game-template-phaser (example game: Yıldız Yakala (`yildiz-yakala`); `scripts/check.mjs` rejects that example slug, so every game must set its own).

## 1. This template

- `game.json`: the game's details. `dir` is `game`.
- `game/`: the whole game. `game/index.html` is required. `game/main.js` is the example game; replace it. Images and sounds go in `game/assets/`.
- `game/phaser.min.js`: Phaser 4.2.1, included in the repo. Don't edit it or swap it for a CDN link.
- `game/oyun-sdk.js`: the site SDK. Don't edit it; load it in `index.html` before the game code.
- `scripts/check.mjs`: the same checks the site runs before publishing. Don't edit it. There is no GitHub Actions workflow: the site publishes each push to `main` itself (section 2).

- Test: `npx serve game`, then open the address it prints. Opened outside the site, the game runs in preview mode (scores stay in the browser; `?lang=en` and `?player=Ali` test those cases).
- Before every commit: `node scripts/check.mjs`.
- Everything the game loads must be inside `game/`: no CDN or other websites.

SDK files for this template (copy unchanged in route G, never edit): `game/oyun-sdk.js` and `game/phaser.min.js`.

## 2. Moving a finished game into oyun-team so it publishes

This section is the same in all four templates (JS, Phaser, Three.js, Godot). Follow it whenever someone asks to "hand in", "submit", "publish", "move", "transfer" or "put the game on the site".

### 2.1 How publishing really works

Everything below is true for the site's publishing code. Do not assume anything else.

- A game is published from **its own GitHub repo**. There is **no GitHub Actions workflow**: nothing runs on GitHub, and the repo needs no `.github/workflows` folder. Don't add one.
- The `oyun-team` organization has the site's GitHub App installed on all its repos. On every push to `main`, GitHub tells the site, and the site downloads that commit, checks it (the same checks as `node scripts/check.mjs`) and publishes the folder that `game.json` → `dir` names.
- The site publishes a push only when **both** are true:
  - the repo's owner is the `oyun-team` organization, and
  - the push is to the `main` branch.
- So pushes made while a repo is still in a personal account do nothing. After the move, the next push to `main` publishes; nothing else needs starting (see 2.6).
- A repo ticked as a **Template repository** in Settings never publishes. Only the four template repos should be ticked, never a game.
- The result shows on GitHub next to the commit: a ✓ or ✗ named **oyun-team / yayın** (hover or click it to read the message). The site owner also sees every attempt on `/admin`.
- There are **no secrets, passwords or tokens to set up** in a game repo. Never ask for one, and never add one.
- The site ties a game's **slug** (from `game.json`) to the **full repo name** (`oyun-team/<repo-name>`) the first time it publishes. After that:
  - the same slug cannot be published from any other repo, and
  - that repo cannot switch to another slug.
- The first release waits for the site owner to approve it on `/admin`. Every later push to `main` goes live by itself in about a minute.
- The site keeps the first approved version as the game's backup. Later versions are not kept, so git history is the only record of them.
- The site owner can also publish a game from a zip on `/admin` (route F) without any repo push.
- Private and public repos publish the same way.

### 2.2 Rules for agents

- Every game repo name must follow 2.9 (`<maker>-<game>`, for example `berfin_toprak-gece_lambasi`). This is strict.
- **Ask the human before** transferring, renaming, deleting, archiving, changing visibility, or creating a repo. These are GitHub account actions that are hard to undo. Explain what will happen in one or two plain sentences; the human may not be a developer.
- Never edit `scripts/check.mjs` or the SDK files (`oyun-sdk.js`, and `oyun.gd` in Godot) to "make it pass". If they are missing or broken, copy them unchanged from the template (2.5, route G).
- Don't add a GitHub Actions workflow to a game repo. Publishing doesn't use one, and private repos would spend the organization's Actions minutes.
- Never force-push or rewrite history on a repo inside `oyun-team`.
- Never change `slug` in `game.json` after the game has published once.
- Many AI tools cannot create or transfer repos in `oyun-team` (for example Claude's GitHub app gets a 403 there). If a call is refused, stop retrying and give the human the exact clicks from this file instead.
- Only the site owner can approve a game. Do not look for a way around it.

### 2.3 Step 0: look before you move anything

Run these in the game's folder and note the answers:

```sh
git remote -v                      # where does the repo live now?
git branch --show-current          # must end up as "main"
git status                         # commit or stash local changes first
node scripts/check.mjs             # must print "✓ <slug> hazır / ready" (Godot: export first, see section 1)
ls scripts/check.mjs game.json
```

If the GitHub CLI is installed and signed in, this answers most questions at once:

```sh
gh repo view --json nameWithOwner,visibility,isFork,isTemplate,defaultBranchRef,parent
```

Check that the repo name follows 2.9 (`<maker>-<game>`). Also check `game.json`: `slug` must be the game's own (not the template example), `author` must be a nickname (not `takma-adin`). `check.mjs` catches both, and so does the site.

### 2.4 Pick the route

| Where the game is now | Route |
|---|---|
| Already in `oyun-team` (created there from the template, or moved earlier) | **D**, then 2.6 |
| A normal repo in a personal account, and that person may create repos in `oyun-team` | **A** (transfer) |
| A normal repo in a personal account, and that person is **not** an `oyun-team` member, or can't create repos there | **B** (owner sets up), then **A** or **C** |
| A **fork** (GitHub shows "forked from ...") | **E** |
| An `oyun-team` repo with the same name already exists | Rename first (2.7), then **A**, or use **C** with a new name |
| Outside GitHub (GitLab, a folder on a computer with git history) | **C** |
| Only files, no git, or nothing else works | **F** (zip) |
| Not made from a template at all, or the check files are missing | **G** first, then any route |

### 2.5 Routes

**A. Transfer the repo (keeps everything: commits, issues, stars, settings)**

Who: the repo's owner (admin) who is also allowed to create repos in `oyun-team`.

1. On GitHub open the repo → **Settings** → **General** → scroll to **Danger Zone** → **Transfer ownership**.
2. Pick or type `oyun-team` as the new owner, type the repo name when asked, and confirm the transfer. Moving into an organization you can create repos in happens at once.
3. If `oyun-team` is not offered or the transfer is refused, the person lacks permission there: use route **B**.

With the GitHub CLI (only after the human says yes): `gh api repos/<owner>/<repo>/transfer -f new_owner=oyun-team`.

Then do 2.6.

**B. The person is not an `oyun-team` member (or can't create repos there)**

The site owner (an owner of `oyun-team`) picks one of these. Tell the human which one to ask for:

1. *Invite them*: the owner invites the person in **oyun-team → People → Invite member**. After they accept the email invitation, use route **A**. The owner can remove them later; the repo stays.
2. *Empty repo + push* (simplest for one-off makers, keeps commits): the owner creates an **empty** repo in `oyun-team` and adds the person under the repo's **Settings → Collaborators and teams** with **Write** access. The person then follows route **C**.
3. *Two-step transfer*: the person transfers the repo (route A steps) to the **owner's personal GitHub account**. GitHub emails the owner, who must accept (the request expires after about a day). The owner then transfers it on to `oyun-team`.

**C. Push the existing history into a new, empty `oyun-team` repo (keeps commits)**

Use for forks, repos outside GitHub, name clashes, or when a transfer is not possible.

1. Someone with rights in `oyun-team` creates the repo: **github.com/new** → Owner **oyun-team** → a repo name that follows 2.9 (`<maker>-<game>`, for example `berfin_toprak-gece_lambasi`) → Private or Public → **leave "Add a README", .gitignore and license all off**. It must be completely empty.
2. Do **not** create it with "Use this template": that makes a new first commit, and pushing the game on top of it fails.
3. In the game folder:

   ```sh
   git branch -m main                 # only if the branch is not already called main
   git remote rename origin old       # keeps a link to the old copy (skip if there is no origin)
   git remote add origin https://github.com/oyun-team/<repo-name>.git
   git push -u origin main
   git push origin --tags             # optional
   ```

4. Push other branches only if the human wants them (`git push origin <branch>`). Only `main` publishes.
5. This first push to `main` inside `oyun-team` already publishes. Check it with 2.6 step 2.

**D. The repo is already in `oyun-team`**

Nothing needs moving. If it was created there with **Use this template**, the first push shows a ✗ because `game.json` still has the template's example slug and author. That is expected. Fill in `game.json`, push to `main`, and continue with 2.6.

**E. It is a fork**

Forks keep a link to the repo they were forked from, and a fork of a public repo cannot be made private. Don't move a fork as it is. Make a clean repo with route **C** (it keeps the commits but drops the fork link).

**F. Zip (no repo needed, loses git history)**

Use when nothing else works, or when the maker has no git history. The site owner can publish a zip straight from the site.

1. The maker makes the zip: on GitHub **Code → Download ZIP**, or zip their project folder. It must contain `game.json` and the game folder that `game.json` → `dir` names (Godot: the web export, see section 1). Leave out `node_modules/`.
2. They send it to the site owner, who opens `/admin` → **Publish a version** → **Upload zip**. A new game then waits for **Approve** like any other.
3. To keep working on it with git later, the owner creates an empty repo as in route C step 1 and pushes the files:

   ```sh
   unzip game.zip -d <repo-name> && cd <repo-name>
   # GitHub's "Download ZIP" puts everything in one extra folder (<repo>-main/); move its contents up first
   node scripts/check.mjs
   git init -b main
   git add -A
   git commit -m "Import <game title> from <maker's nickname>"
   git remote add origin https://github.com/oyun-team/<repo-name>.git
   git push -u origin main
   ```

   If the game first came as a zip, its slug belongs to the upload, so the first push from the new repo fails with `slug "x" is already used by another game`. Ask the site owner to link the slug to the repo.

4. GitHub's web upload (**Add file → Upload files**) also works for small games, but it rejects files over 25 MB.

**G. The game was not made from a template, or files are missing**

The repo needs these, copied unchanged from the matching template (the one named at the top of this file): `scripts/check.mjs`, `game.json` (then filled in), `.gitignore`, and the SDK file(s) listed in section 1. The game itself must sit in the folder that `game.json` → `dir` names, with an `index.html` at its top level. Run `node scripts/check.mjs` until it passes, commit, then pick a route.

### 2.6 After the move: make it publish

1. **Push to `main`.** Any commit to `main` made after the move publishes. If there is nothing to change, ask the site owner to click **Publish from GitHub** on `/admin` with the repo's name.
2. **Look at the result.** On GitHub, the commit on `main` gets a ✓ or ✗ named **oyun-team / yayın** within a minute (repo page → the mark next to the latest commit). Its message is the site's answer:
   - `Yönetici onayı bekleniyor / waiting for approval`: it reached the site. Tell the human the site owner must approve it on `/admin`.
   - `Yayında / live: <url>`: it is on the site at that address.
   - A ✗ with an error: see 2.8.
   - No mark at all after a few minutes: see 2.8.
3. **Access.** Open **Settings → Collaborators and teams** and make sure the maker still has **Write** access, so they can keep improving the game. Add them if not.
4. **Remotes.** On every computer that has a copy, point it at the new place (GitHub forwards old links after a transfer, but don't rely on it):

   ```sh
   git remote set-url origin https://github.com/oyun-team/<repo-name>.git
   git remote -v
   git fetch origin && git branch -u origin/main main
   ```

   In GitHub Desktop: **Repository → Repository settings → Remote**.
5. **The old copy.** After route C or F an old repo still exists. Keep it until the game is live. Archiving or deleting it is the human's choice; never do it on your own.
6. **From now on:** every push to `main` updates the game, without approval. Work on other branches and merge into `main` when it is ready to go live.

### 2.7 Situations to know

- **Branch is `master` or something else.** Only `main` publishes. On GitHub: **Settings → General → Default branch**, click the pencil and rename it to `main`. Then locally: `git branch -m master main && git fetch origin && git branch -u origin/main main && git remote set-head origin -a`.
- **Repo name vs slug.** The repo name must follow 2.9 (`<maker>-<game>`); the game's address is `/oyun/<slug>` from `game.json`. They differ on purpose: `berfin_toprak-gece_lambasi` publishes the slug `gece-lambasi`.
- **Renaming the repo.** Before the first publish: fine, any time. **After** the first publish: don't. The site remembers the old full name, so the next push fails with `slug "x" is already used by another game`. To fix: rename it back, or ask the site owner to update the stored repo name.
- **Changing the slug.** Before the first publish: fine. After: refused with `this repo already published as "x"`. Put the old slug back, or ask the site owner.
- **Same game in two repos.** Only the first one to publish owns the slug. Pick one repo and push only there.
- **Name clash in `oyun-team`.** A transfer fails if `oyun-team` already has a repo with that name. Rename the repo first (allowed, if it has never published), or use route C with a new name.
- **Private or public.** Both publish, and neither uses GitHub Actions minutes. Private is the default for games; public is fine too. Visibility can change later without affecting publishing.
- **An old workflow file.** Games made before publishing moved to the site may still have `.github/workflows/publish.yml`. Delete that file (it spends Actions minutes and is no longer needed); publishing keeps working.
- **Large files.** GitHub refuses any single file over 100 MB and warns above 50 MB. The site refuses a game folder over 60 MB, and a whole repo download over 200 MB. Don't use **Git LFS**: the site's download does not include LFS files, so it would get placeholder text files instead of images and sounds. Shrink assets instead (compress images, `.ogg` or `.mp3` audio). If a huge file is already in the history, ask the human before rewriting history; it's usually simpler to delete it, commit, and use route C, F or a fresh start.
- **Hidden files.** Files and folders starting with `.` inside the game folder are left out of the published game. Don't put assets there.
- **Upper/lower case.** The site runs on Linux, where `Player.png` and `player.png` are different files. A game that works on Windows or macOS can miss images on the site. Make every file path in the code match the real file name exactly.
- **Several pushes at once.** The site publishes one at a time; a repo pushed again while waiting is published once, at its newest commit.
- **Working with others.** One game is one repo. Teammates are added as collaborators, not as separate copies.
- **The template flag.** A game made with **Use this template** is not a template. If **Settings → General → Template repository** is ticked on a game, untick it, or it never publishes.

### 2.8 Reading a failed or missing result

| What you see | Cause | Fix |
|---|---|---|
| No ✓ or ✗ after a push | Pushed to a branch that isn't `main`, the repo is not in `oyun-team` yet, it is ticked as a Template repository, or the site was busy | 2.7 branch, move it (2.4), 2.7 template flag; else ask the site owner to click **Publish again** on `/admin` |
| ✗ `slug: change the example slug to your own` / `author: put your own nickname` | `game.json` still has the template's example values | Fill in `game.json` |
| ✗ `game/index.html is missing` (or `build/...` in Godot) | No `index.html` at the top of the game folder | See section 1 for this template's game folder |
| ✗ `game.json is missing` | `game.json` is not at the top of the repo | Move it there |
| ✗ `game is larger than 60 MB` / `repo is larger than 200 MB` | Game folder or repo too big | Shrink assets (2.7 large files) |
| ✗ `slug "x" is already used by another game` | Another repo owns this slug, or this repo was renamed after publishing | New slug if never published; otherwise 2.7 renaming |
| ✗ `this repo already published as "x"` | The slug in `game.json` changed after the first publish | Put the old slug back |
| ✗ `thumbnail ... is not in the game folder` | Wrong thumbnail path | Fix `game.json` `thumbnail` |
| ✗ `the site's GitHub App is not installed on ...` / `GitHub said ...` / `server error` | The site's GitHub setup or the site itself | Tell the site owner |
| ✓ `waiting for approval` for a long time | Normal for a first release | The site owner approves it on `/admin` |

### 2.9 Repo name: a strict rule

Every game repo is named **`<maker>-<game>`**, so anyone can see who made which game. Example: Berfin Toprak's game Gece Lambası lives in `berfin_toprak-gece_lambasi`, not `gece_lambasi`.

- `<maker>` is the maker's first and last name. `<game>` is the game's name.
- Lowercase only. Turkish letters become plain ones: ç→c, ğ→g, ı→i, İ→i, ö→o, ş→s, ü→u. Drop apostrophes and other punctuation.
- A space inside the maker part or the game part becomes `_`. There is exactly one `-`, between the maker and the game.
- Allowed characters: `a-z`, `0-9`, `_` and that one `-`. As a pattern: `^[a-z0-9]+(_[a-z0-9]+)*-[a-z0-9]+(_[a-z0-9]+)*$`.
- This applies to every new game repo, in a personal account or in `oyun-team`. Set it when creating the repo (**Use this template → Repository name**, or **github.com/new** in route C), so it never needs renaming.
- The repo name is not the slug. The slug in `game.json` stays short with dashes (`gece-lambasi`) and is the game's address on the site. The repo name is only shown to the site owner.
- A repo with a wrong name that has **never published**: rename it before moving it (**Settings → General → Repository name**; ask the human first, 2.2).
- A repo with a wrong name that has **already published**: don't rename it. Renaming stops publishing until the site owner updates the stored repo name (2.7). Tell the human; the site owner decides.
- Agents: whenever you create a repo, or tell a human what name to type, check it against this rule first. Don't move a game whose repo name breaks it without asking the human to fix the name.

## 3. Phaser (2D): notes for moving

- Nothing is built on GitHub: what is in `game/` is exactly what is published, including `phaser.min.js`.
- For a zip (route F), include `game/` (with `assets/` and `phaser.min.js`), `game.json`, `scripts/`, `.github/`, `.gitignore`, `README.md`, `AGENTS.md`, `CLAUDE.md`. Leave out `node_modules/` and `game.zip`.
- Big sprite sheets and music are the usual reason for the 60 MB limit; compress them before moving.
- The publish run takes well under a minute.

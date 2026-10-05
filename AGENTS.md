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
- `scripts/check.mjs`, `.github/workflows/publish.yml`: checking and publishing. Don't edit them.

- Test: `npx serve game`, then open the address it prints. Opened outside the site, the game runs in preview mode (scores stay in the browser; `?lang=en` and `?player=Ali` test those cases).
- Before every commit: `node scripts/check.mjs`.
- Everything the game loads must be inside `game/`: no CDN or other websites.

SDK files for this template (copy unchanged in route G, never edit): `game/oyun-sdk.js` and `game/phaser.min.js`.

## 2. Moving a finished game into oyun-team so it publishes

This section is the same in all four templates (JS, Phaser, Three.js, Godot). Follow it whenever someone asks to "hand in", "submit", "publish", "move", "transfer" or "put the game on the site".

### 2.1 How publishing really works

Everything below is true for this repo's `.github/workflows/publish.yml` and the site's publish endpoint. Do not assume anything else.

- A game is published from **its own GitHub repo** by the workflow **Yayınla / Publish**. It runs on every push to `main`, and can also be started by hand (**Actions → Yayınla / Publish → Run workflow**).
- The steps are: **Check** (runs `node scripts/check.mjs`) on every run, anywhere. **Package** and **Publish** run only when **both** are true *at the moment the run starts*:
  - the repo's owner is the `oyun-team` organization, and
  - the run is on the `main` branch.
- So a repo outside `oyun-team` shows a green check with **Package** and **Publish** greyed out as skipped. That is normal, and it is not a publish. It does **not** fix itself after the move: a new run is needed (see 2.6).
- The whole job is skipped if the repo is ticked as a **Template repository** in Settings. Only the four template repos should be ticked, never a game.
- The workflow proves who it is with a GitHub OIDC token, so there are **no secrets, passwords or tokens to set up**. Never ask for one, and never add one.
- The site then checks again: the token must come from a repo owned by `oyun-team`, on `refs/heads/main`.
- The site ties a game's **slug** (from `game.json`) to the **full repo name** (`oyun-team/<repo-name>`) the first time it publishes. After that:
  - the same slug cannot be published from any other repo, and
  - that repo cannot switch to another slug.
- The first release waits for the site owner to approve it on `/admin`. Every later push to `main` goes live by itself in about a minute.
- Private and public repos publish the same way.

### 2.2 Rules for agents

- Every game repo name must follow 2.9 (`<maker>-<game>`, for example `berfin_toprak-gece_lambasi`). This is strict.
- **Ask the human before** transferring, renaming, deleting, archiving, changing visibility, or creating a repo. These are GitHub account actions that are hard to undo. Explain what will happen in one or two plain sentences; the human may not be a developer.
- Never edit `.github/workflows/publish.yml`, `scripts/check.mjs` or the SDK files (`oyun-sdk.js`, and `oyun.gd` in Godot) to "make it pass". If they are missing or broken, copy them unchanged from the template (2.5, route G).
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
node scripts/check.mjs             # must print "✓ <slug> hazır / ready" (Godot: see section 1)
ls .github/workflows/publish.yml scripts/check.mjs game.json
```

If the GitHub CLI is installed and signed in, this answers most questions at once:

```sh
gh repo view --json nameWithOwner,visibility,isFork,isTemplate,defaultBranchRef,parent
```

Check that the repo name follows 2.9 (`<maker>-<game>`). Also check `game.json`: `slug` must be the game's own (not the template example), `author` must be a nickname (not `takma-adin`). `check.mjs` catches both.

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
| Not made from a template at all, or the workflow/check files are missing | **G** first, then any route |

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
5. This first push already runs the workflow inside `oyun-team`, so it publishes. Check it with 2.6 step 2.

**D. The repo is already in `oyun-team`**

Nothing needs moving. If it was created there with **Use this template**, the very first run fails at **Check** because `game.json` still has the template's example slug and author. That red X is expected. Fill in `game.json`, push to `main`, and continue with 2.6.

If the repo was moved in earlier and its last run says Package/Publish **skipped**, that run happened before the move. Start a new run (2.6 step 1).

**E. It is a fork**

Forks keep a link to the repo they were forked from, a fork of a public repo cannot be made private, and GitHub turns workflows off in forks until someone enables them. Don't move a fork as it is. Make a clean repo with route **C** (it keeps the commits but drops the fork link). If a fork is already inside `oyun-team` and must stay, open its **Actions** tab and click the button that enables workflows, then do 2.6.

**F. Zip fallback (loses git history)**

Use only when nothing else works, or when the maker has no git history.

1. The maker makes the zip: on GitHub **Code → Download ZIP**, or zip their project folder. Leave out generated folders (see section 3) and `node_modules/`. The hidden `.github` folder must be inside (macOS Finder hides it; press Cmd+Shift+. to show hidden files).
2. They send it to the site owner. The owner creates an empty repo as in route C step 1.
3. On the owner's computer:

   ```sh
   unzip game.zip -d <repo-name> && cd <repo-name>
   # GitHub's "Download ZIP" puts everything in one extra folder (<repo>-main/); move its contents up first
   ls .github/workflows/publish.yml game.json scripts/check.mjs
   node scripts/check.mjs
   git init -b main
   git add -A
   git commit -m "Import <game title> from <maker's nickname>"
   git remote add origin https://github.com/oyun-team/<repo-name>.git
   git push -u origin main
   ```

4. GitHub's web upload (**Add file → Upload files**) also works for small games, but it rejects files over 25 MB and may skip the hidden `.github` folder. Check that `.github/workflows/publish.yml` exists afterwards.

**G. The game was not made from a template, or files are missing**

The repo needs these, copied unchanged from the matching template (the one named at the top of this file): `.github/workflows/publish.yml`, `scripts/check.mjs`, `game.json` (then filled in), `.gitignore`, and the SDK file(s) listed in section 1. The game itself must sit in the folder that `game.json` → `dir` names, with an `index.html` at its top level. Run `node scripts/check.mjs` until it passes, commit, then pick a route.

### 2.6 After the move: make it publish

1. **Start a new run on `main`.** Either push any commit to `main`, or open **Actions → Yayınla / Publish → Run workflow**, pick branch `main`, and click **Run workflow**. Do not use "Re-run" on a run from before the move; start a new one.
2. **Open the run.** All of **Check**, **Package** and **Publish** must be green, none skipped. The run's **Summary** shows the site's answer:
   - `"status": "waiting for approval"`: it reached the site. Tell the human the site owner must approve it on `/admin`.
   - `"status": "live"`: it is on the site at the `url` shown.
   - Anything with `"ok": false`: see 2.8.
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
- **Renaming the repo.** Before the first publish: fine, any time. **After** the first publish: don't. The site remembers the old full name, so the next run fails with `slug "x" is already used by another game`. To fix: rename it back, or ask the site owner to update the stored repo name.
- **Changing the slug.** Before the first publish: fine. After: refused with `this repo already published as "x"`. Put the old slug back, or ask the site owner.
- **Same game in two repos.** Only the first one to publish owns the slug. Pick one repo and push only there.
- **Name clash in `oyun-team`.** A transfer fails if `oyun-team` already has a repo with that name. Rename the repo first (allowed, if it has never published), or use route C with a new name.
- **Private or public.** Both publish. Private is the default for games; public is fine too. Visibility can change later without affecting publishing. Private repos use the organization's monthly GitHub Actions minutes (public repos don't). If those run out, runs fail with a billing message until the next month or until the repo is made public; tell the human.
- **Actions disabled.** If the **Actions** tab shows a button to enable workflows, click it (needs admin on the repo). If **Yayınla / Publish** itself is marked disabled, open it, click **...** and **Enable workflow**. If runs never start at all, check **Settings → Actions → General**: it must allow actions, including GitHub's own `actions/checkout` and `actions/cache`. Organization-wide Actions settings can only be changed by an `oyun-team` owner.
- **Large files.** GitHub refuses any single file over 100 MB and warns above 50 MB. The site refuses a game folder over 60 MB. Don't use **Git LFS**: the workflow does not download LFS files, so the site would get placeholder text files instead of images and sounds. Shrink assets instead (compress images, `.ogg` or `.mp3` audio). If a huge file is already in the history, ask the human before rewriting history; it's usually simpler to delete it, commit, and use route C, F or a fresh start.
- **Hidden files.** Files and folders starting with `.` inside the game folder are left out of the published game. Don't put assets there.
- **Upper/lower case.** The site runs on Linux, where `Player.png` and `player.png` are different files. A game that works on Windows or macOS can miss images on the site. Make every file path in the code match the real file name exactly.
- **Several runs at once.** A new push to `main` cancels a run still in progress. A greyed "cancelled" run is normal; the newest run is the one that counts.
- **Working with others.** One game is one repo. Teammates are added as collaborators, not as separate copies.
- **The template flag.** A game made with **Use this template** is not a template. If **Settings → General → Template repository** is ticked on a game, untick it, or nothing will run.

### 2.8 Reading a failed or skipped run

| What you see | Cause | Fix |
|---|---|---|
| No run at all after a push | Pushed to a branch that isn't `main`, the workflow file is missing, or Actions is off | 2.7 branch, route G, 2.7 Actions |
| Whole job grey, "skipped" | Repo is ticked as a Template repository | Untick it (2.7) |
| Check green, Package and Publish skipped | Run started while the repo was outside `oyun-team`, or not on `main` | Move it, then start a new run (2.6) |
| Check fails: `change the example slug to your own` / `put your own nickname` | `game.json` still has the template's example values | Fill in `game.json` |
| Check fails: `index.html bulunamadı / not found` | No `index.html` at the top of the game folder | See section 1 for this template's game folder |
| Check fails: `larger than 60 MB` | Game folder too big | Shrink assets (2.7 large files) |
| Publish: `repository must belong to oyun-team` | Ran outside the organization | Move it (2.4) |
| Publish: `only pushes to main can publish` | Ran on another branch | Merge into `main` |
| Publish: `slug "x" is already used by another game` | Another repo owns this slug, or this repo was renamed after publishing | New slug if never published; otherwise 2.7 renaming |
| Publish: `this repo already published as "x"` | The slug in `game.json` changed after the first publish | Put the old slug back |
| Publish: `game is too large` | Over the site's limit | Shrink assets |
| Publish: `index.html is missing from the zip root` / `thumbnail ... is not in the game folder` | Wrong folder layout or thumbnail path | Fix `game.json` `dir` / `thumbnail` |
| Publish: `invalid token`, connection errors, 5xx | The site is down or busy | Wait, then **Run workflow** again; if it keeps failing, tell the site owner |
| `"status": "waiting for approval"` for a long time | Normal for a first release | The site owner approves it on `/admin` |

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

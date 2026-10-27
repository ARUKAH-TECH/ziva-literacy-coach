# ZIVA Literacy & Handwriting Coach

An installable, offline-capable learning app for Kindergarten, Primary 1–6 and
JHS 1–3 learners in Ghana. Lives at **https://learn.zivarukah.com**, separate
from the main website (https://zivarukah.com), with its own name, icon,
manifest and service worker.

## What works (version 1)

| Area | What learners do |
|---|---|
| Choose class | KG, Primary 1–3, Primary 4–6, JHS — the lesson list adapts |
| Letters & sounds | Tap A–Z to hear name + sound with a picture word; "Find the letter" listening quiz |
| Blend the sounds | Tap each sound, blend, pick the matching picture (CVC for KG; digraphs/syllables for P1–3) |
| Handwriting | Trace strokes, capitals, small letters, numbers, words and sentences on handwriting lines; "Check" scores coverage + staying on the line (1–3 stars) |
| Reading | Stories per level (KG → JHS passages), "Read to me", comprehension questions with explanations |
| Reading speed | Time yourself reading aloud → words per minute against a friendly guide |
| Spelling | Hear a word in a sentence, type it |
| Word meanings / Punctuation | Multiple-choice practice for P4–6 and JHS |
| My progress | Stars per exercise, practice days, streak; "Clear my progress" |
| Install | Install button when the browser offers it; Android/iOS/desktop steps otherwise; hidden when already installed |
| Offline | After the first visit the whole app is saved; all activities work offline |

## Privacy

No accounts, no names, no recordings. Progress is stored only in the
browser on that device (`localStorage`) and can be deleted from *My progress*.
Nothing about learners is sent to a server. Teacher/parent accounts are a
planned next phase and will need parental consent.

## How it is built

- Next.js 16 static export (`output: "export"`) → plain files in `out/`.
- `public/manifest.webmanifest` — id/start_url/scope `/`, standalone.
- `public/sw.js` — caches only this origin; downloads every file listed in
  `out/precache.json` (made by `scripts/precache.mjs` after the build).
  Pages: network first, offline copy as fallback. Built assets: cache first.
- Read-aloud uses the device's own speech voices (Web Speech API).

## Deploy

Vercel project `ziva-literacy-coach`, framework Next.js, build `npm run build`,
output `out`. Domain: `learn.zivarukah.com` via a Cloudflare **CNAME**
`learn → cname.vercel-dns.com` (DNS only / grey cloud).

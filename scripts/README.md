# DNBC Scripts

## refresh-podcast.mjs

This script refreshes the podcast episodes data by fetching content from SoundCloud and processing episode information.

### Usage

```bash
node scripts/refresh-podcast.mjs
```

### What it does

1. Fetches podcast data from https://soundcloud.com/dienachtbrenntclub
2. Detects episode numbers from titles using patterns like:
   - `001`, `002`, `003` (leading numbers)
   - `EP 001`, `Ep 002` (with EP prefix)
   - `E001`, `E002` (with E prefix)
   - Handles 1-3 digit numbers, padding with leading zeros
3. Adds an `episodeNumber` field to each episode (preserving leading zeros)
4. Sorts episodes in descending order by episode number
5. Falls back to sorting by `publishedAt` for episodes without numbers
6. Saves the result to `podcasts/episodes.json`

### Output Format

The script generates a JSON file with episodes in this format:

```json
[
  {
    "title": "003 - Progressive House Mix",
    "description": "Third episode with progressive house tracks",
    "publishedAt": "2024-01-29T10:00:00Z",
    "url": "https://soundcloud.com/dienachtbrenntclub/003-progressive",
    "duration": 4200,
    "episodeNumber": "003"
  }
]
```

### Dependencies

- Node.js (ES modules support)
- No external dependencies required
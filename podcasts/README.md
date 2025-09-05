# DNBC Podcasts - SoundCloud Integration

## Overview

This document describes the automated SoundCloud integration for updating DNBC podcast episodes.

## Setup

### 1. SoundCloud API Access

To enable automatic episode updates from SoundCloud, you need to:

1. Register your application with SoundCloud at: https://developers.soundcloud.com/
2. Get your Client ID from the SoundCloud Developer Dashboard
3. Add the Client ID as a repository secret in GitHub:
   - Go to Settings > Secrets and variables > Actions
   - Add a new secret named `SOUNDCLOUD_CLIENT_ID`
   - Set the value to your SoundCloud Client ID

### 2. Configuration

The workflow is configured to:
- Run daily at 6 AM UTC
- Check for new tracks from the DNBC SoundCloud account
- Update `podcasts/episodes.json` with new episodes
- Automatically commit changes to the repository

## Manual Updates

You can also manually trigger the workflow:
1. Go to the Actions tab in your GitHub repository
2. Select "Update Podcast Episodes from SoundCloud"
3. Click "Run workflow"

## Episode Format

Episodes are stored in `podcasts/episodes.json` with the following structure:

```json
{
  "id": 1,
  "title": "Episode Title",
  "artist": "Artist Name",
  "description": "Episode description",
  "duration": "01:15:30",
  "publishDate": "2024-01-15",
  "soundcloudUrl": "https://soundcloud.com/...",
  "embedUrl": "https://w.soundcloud.com/player/...",
  "genre": "Techno",
  "artwork": "/img/podcasts/podcast-001.jpg"
}
```

## Troubleshooting

### Episodes not updating automatically
1. Check that `SOUNDCLOUD_CLIENT_ID` secret is properly set
2. Verify the SoundCloud username in the workflow file
3. Check the Actions tab for any workflow errors

### Manual episode management
You can manually edit `podcasts/episodes.json` to:
- Add episodes from other sources
- Update episode information
- Remove outdated episodes

The file will be automatically validated when you commit changes.

## File Structure

```
podcasts/
├── index.html          # Main podcasts page
├── episodes.json       # Episode data
└── submit/
    └── index.html      # Podcast submission form
```

## Support

For issues with the podcast system, please create an issue in this repository or contact the DNBC team.
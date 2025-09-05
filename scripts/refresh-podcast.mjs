#!/usr/bin/env node

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOUNDCLOUD_PROFILE = 'https://soundcloud.com/dienachtbrenntclub';
const EPISODES_FILE = join(__dirname, '../podcasts/episodes.json');

/**
 * Extract episode number from title
 * Supports patterns like: '001', '002', 'EP 001', 'Ep 001', etc.
 */
function extractEpisodeNumber(title) {
  // Pattern to match episode numbers with optional 'EP' prefix
  const patterns = [
    /^(\d{3})/,              // Leading 3 digits: "001 - Title"
    /^EP\s*(\d{1,3})/i,      // EP prefix: "EP 001", "Ep 001", "EP 7"
    /^E(\d{1,3})/i,          // E prefix: "E001", "E7"
    /\b(\d{3})\b/,           // Any 3 digits: "Title 001 Something"
    /^(\d{1,2})/,            // Leading 1-2 digits: "01 - Title", "7 - Title" 
    /\b(\d{1,2})\b/,         // Any 1-2 digits
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) {
      // Pad with leading zeros to ensure 3 digits
      return match[1].padStart(3, '0');
    }
  }
  
  return null;
}

/**
 * Mock function to simulate fetching SoundCloud data
 * In a real implementation, this would call SoundCloud's API
 */
async function fetchSoundCloudData() {
  // For now, return mock data that demonstrates the functionality
  // In a real implementation, this would fetch from SoundCloud API
  const mockData = [
    {
      title: "001 - Tech House Selection",
      description: "First episode of our podcast series",
      publishedAt: "2024-01-15T10:00:00Z",
      url: "https://soundcloud.com/dienachtbrenntclub/001-tech-house",
      duration: 3600
    },
    {
      title: "EP 002 - Underground Vibes", 
      description: "Second episode featuring underground sounds",
      publishedAt: "2024-01-22T10:00:00Z",
      url: "https://soundcloud.com/dienachtbrenntclub/ep-002-underground",
      duration: 3900
    },
    {
      title: "003 - Progressive House Mix",
      description: "Third episode with progressive house tracks",
      publishedAt: "2024-01-29T10:00:00Z", 
      url: "https://soundcloud.com/dienachtbrenntclub/003-progressive",
      duration: 4200
    },
    {
      title: "Special Mix - No Number",
      description: "A special mix without episode number",
      publishedAt: "2024-02-01T10:00:00Z",
      url: "https://soundcloud.com/dienachtbrenntclub/special-mix",
      duration: 2700
    }
  ];

  return mockData;
}

/**
 * Process episodes: add episode numbers and sort
 */
function processEpisodes(rawEpisodes) {
  // Add episodeNumber field to each episode
  const episodesWithNumbers = rawEpisodes.map(episode => {
    const episodeNumber = extractEpisodeNumber(episode.title);
    return {
      ...episode,
      episodeNumber
    };
  });

  // Sort episodes: descending by episodeNumber, fallback to publishedAt
  episodesWithNumbers.sort((a, b) => {
    // If both have episode numbers, sort by episode number (descending)
    if (a.episodeNumber && b.episodeNumber) {
      return b.episodeNumber.localeCompare(a.episodeNumber);
    }
    
    // If only one has episode number, prioritize it
    if (a.episodeNumber && !b.episodeNumber) return -1;
    if (!a.episodeNumber && b.episodeNumber) return 1;
    
    // If neither has episode number, sort by publishedAt (descending)
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  return episodesWithNumbers;
}

/**
 * Main function to refresh podcast episodes
 */
async function refreshPodcast() {
  try {
    console.log(`Fetching podcast data from ${SOUNDCLOUD_PROFILE}...`);
    
    // Fetch raw episode data
    const rawEpisodes = await fetchSoundCloudData();
    console.log(`Found ${rawEpisodes.length} episodes`);
    
    // Process episodes (add episode numbers and sort)
    const processedEpisodes = processEpisodes(rawEpisodes);
    
    // Ensure the podcasts directory exists
    await fs.mkdir(dirname(EPISODES_FILE), { recursive: true });
    
    // Write to episodes.json
    await fs.writeFile(
      EPISODES_FILE,
      JSON.stringify(processedEpisodes, null, 2),
      'utf8'
    );
    
    console.log(`Successfully updated ${EPISODES_FILE}`);
    console.log('Episodes processed:');
    processedEpisodes.forEach(ep => {
      console.log(`  ${ep.episodeNumber || 'NO_NUM'}: ${ep.title}`);
    });
    
  } catch (error) {
    console.error('Error refreshing podcast:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  refreshPodcast();
}

export { refreshPodcast, extractEpisodeNumber, processEpisodes };
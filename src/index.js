const { Engine, defaultPreset } = require('../ublock/lib/adblock_engine');
const fs = require('fs');
const path = require('path-browserify');

// Initialize the adblock engine
const engine = new Engine();

// Load updated filter lists
const easyListPath = path.join(__dirname, '../ublock/filters/easylist.txt');
const fanboyAnnoyancesPath = path.join(__dirname, '../ublock/filters/fanboy-annoyance.txt');
const youtubeFilterPath = path.join(__dirname, '../ublock/filters/youtube.txt');

const easyListContent = fs.readFileSync(easyListPath, 'utf8');
const fanboyAnnoyancesContent = fs.readFileSync(fanboyAnnoyancesPath, 'utf8');
const youtubeFilterContent = fs.readFileSync(youtubeFilterPath, 'utf8');

Promise.all([
  engine.updateFilters(defaultPreset, easyListContent),
  engine.updateFilters(defaultPreset, fanboyAnnoyancesContent),
  engine.updateFilters(defaultPreset, youtubeFilterContent)
])
.then(() => {
  console.log('Filters updated');
})
.catch((error) => {
  console.error('Error updating filters:', error);
});

// Example function to check if a URL should be blocked
function shouldBlock(url) {
  return engine.match(url);
}

// Usage example
const testUrl = 'https://example.com/ad';
if (shouldBlock(testUrl)) {
  console.log(`${testUrl} is blocked`);
} else {
  console.log(`${testUrl} is allowed`);
}

// Export functions if needed
module.exports = {
  shouldBlock,
};

const https = require('https');

// Function to make HTTPS request
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to extract URL from HTML
function extractURL(html) {
  console.log('HTML length:', html.length);
  
  // Find all <b class="ramp ref" value="CHARACTER"> elements
  const regex = /<b class="ramp ref" value="([^"]+)">/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  
  console.log('Found matches:', matches);
  console.log('Number of matches:', matches.length);
  
  // Join all characters to form the URL
  const url = matches.join('');
  return url;
}

// Main function
async function main() {
  try {
    const url = 'https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge';
    console.log('Fetching HTML from:', url);
    
    const html = await fetchHTML(url);
    console.log('HTML fetched successfully');
    
    // Let's look at a sample of the HTML to understand the structure
    console.log('\nSample HTML (first 1000 chars):');
    console.log(html.substring(0, 1000));
    
    const hiddenURL = extractURL(html);
    console.log('\nHidden URL found:', hiddenURL);
    
    if (hiddenURL) {
      // Test the hidden URL
      console.log('\nTesting hidden URL...');
      const flagResponse = await fetchHTML(hiddenURL);
      console.log('Flag response:', flagResponse);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 
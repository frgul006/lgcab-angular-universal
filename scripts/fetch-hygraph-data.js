const https = require('https');
const fs = require('fs');
const path = require('path');

const endpoint =
  process.env.HYGRAPH_ENDPOINT ||
  'https://api-eu-central-1.graphcms.com/v2/cjpa3dpw90mgv01exr2iiru13/master';
const token = process.env.HYGRAPH_TOKEN;

if (!token) {
  console.error('Missing HYGRAPH_TOKEN in environment.');
  process.exit(1);
}

const outputDir = path.join(__dirname, '..', 'src', 'assets', 'data');

function fetchGraphQL(query, variables) {
  const payload = JSON.stringify({ query, variables });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(endpoint, options, res => {
      let body = '';
      res.on('data', chunk => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`Request failed (${res.statusCode}): ${body}`));
          return;
        }

        try {
          const json = JSON.parse(body);
          if (json.errors) {
            reject(new Error(JSON.stringify(json.errors, null, 2)));
            return;
          }
          resolve(json.data);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function writeJson(filename, data) {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${filePath}`);
}

async function run() {
  fs.mkdirSync(outputDir, { recursive: true });

  const [contactData, splashData, philosophiesData, projectsData, pageComponentsData] =
    await Promise.all([
      fetchGraphQL(`
        query contactQ {
          contacts {
            phoneNo
            organizationNo
            email
            postAddress {
              content
              mapUrl
            }
            visitingAddress {
              content
              mapUrl
            }
          }
        }
      `),
      fetchGraphQL(`
        query splash {
          splashes {
            title
            subtitle
            callToAction
            backgroundImage {
              url
            }
          }
        }
      `),
      fetchGraphQL(`
        query allPhilosophies {
          philosophies(orderBy: order_ASC) {
            order
            title
            content
            image {
              url
            }
          }
        }
      `),
      fetchGraphQL(`
        query allProjects {
          projects(orderBy: title_ASC) {
            id
            title
            description
            role
            createdAt
            currentStatus
          }
        }
      `),
      fetchGraphQL(`
        query allPageComponents {
          pageComponents {
            slug
            title
            preamble
            content
          }
        }
      `)
    ]);

  writeJson('contact.json', contactData.contacts[0] || null);
  writeJson('splash.json', splashData.splashes[0] || null);
  writeJson('philosophies.json', philosophiesData.philosophies || []);
  writeJson('projects.json', projectsData.projects || []);
  writeJson('page-components.json', pageComponentsData.pageComponents || []);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});

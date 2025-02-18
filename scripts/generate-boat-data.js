const { parse } = require('csv-parse/sync');
const fs = require('fs');
const path = require('path');

function parseBoatName(presentation) {
  const firstLine = presentation.split('\n')[0];
  return firstLine.split(' Rates:')[0].trim();
}

function extractImageUrl(presentation) {
  const lines = presentation.split('\n');
  const photoLine = lines.find(line => line.trim().startsWith('Photos:'));
  if (!photoLine) return '';
  return photoLine.split('Photos:')[1].trim();
}

async function generateBoatData() {
  try {
    const csvFilePath = path.join(process.cwd(), 'data.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    const boatData = records.map(record => ({
      id: record[''] || '',
      presentation: record.Presentation || '',
      rate4hr: record['RETAIL 4hr'] || '',
      rate6hr: record['Retail 6hr'] || '',
      rate8hr: record['Retail 8hr'] || '',
      pdf: record.PDF || '',
      location: record.Location || '',
      name: parseBoatName(record.Presentation || ''),
      imageUrl: extractImageUrl(record.Presentation || '')
    }));

    const outputPath = path.join(process.cwd(), 'src', 'data', 'boat-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(boatData, null, 2));
    console.log('Boat data generated successfully!');
  } catch (error) {
    console.error('Error generating boat data:', error);
    process.exit(1);
  }
}

generateBoatData();

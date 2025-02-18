import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { promises as fs } from 'fs';
import path from 'path';
import { BoatData } from '@/types/boat';

export async function GET() {
  try {
    const csvFilePath = path.join(process.cwd(), 'data.csv');
    const fileContent = await fs.readFile(csvFilePath, 'utf-8');
    
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    const boatData: BoatData[] = records.map((record: any) => ({
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

    return NextResponse.json(boatData);
  } catch (error) {
    console.error('Error reading boat data:', error);
    return NextResponse.json({ error: 'Failed to load boat data' }, { status: 500 });
  }
}

function parseBoatName(presentation: string): string {
  const firstLine = presentation.split('\n')[0];
  return firstLine.split(' Rates:')[0].trim();
}

function extractImageUrl(presentation: string): string {
  const lines = presentation.split('\n');
  const photoLine = lines.find(line => line.trim().startsWith('Photos:'));
  if (!photoLine) return '';
  return photoLine.split('Photos:')[1].trim();
}

export interface BoatData {
  id: string;
  presentation: string;
  rate4hr: string;
  rate6hr: string;
  rate8hr: string;
  pdf: string;
  location: string;
  name: string;
  imageUrl: string;
}

export function parseBoatName(presentation: string): string {
  const firstLine = presentation.split('\n')[0];
  return firstLine.split(' Rates:')[0].trim();
}

export function extractImageUrl(presentation: string): string {
  const lines = presentation.split('\n');
  const photoLine = lines.find(line => line.trim().startsWith('Photos:'));
  if (!photoLine) return '';
  return photoLine.split('Photos:')[1].trim();
}

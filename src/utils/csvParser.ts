import { BoatData } from '../types/boat';
import boatData from '../data/boat-data.json';

export async function readBoatData(): Promise<BoatData[]> {
  try {
    return boatData as BoatData[];
  } catch (error) {
    console.error('Error loading boat data:', error);
    return [];
  }
}

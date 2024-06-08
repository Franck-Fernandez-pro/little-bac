import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const CATEGORIES = {
  animal: 'Animal',
  country: 'Pays',
  job: 'Métier',
  fruit: 'Fruit/légume',
  city: 'Ville',
  brand: 'Marque',
  object: 'Objet',
  celebrity: 'Célébrité',
  sport: 'Sport',
  bodyPart: 'Partie du corps',
  instrument: 'Instrument de musique',
  dailyObject: 'Objet du quotidien',
  superHero: 'Super héro',
} as const;

export const CATEGORIES_KEYS = Object.keys(CATEGORIES);
export const CATEGORIES_VALUES = Object.values(CATEGORIES);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomLetter() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters[Math.floor(Math.random() * letters.length)];
}

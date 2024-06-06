'use client';

import WaitingRoom from './_components/Waiting';

const CATEGORIES = [
  'Animal',
  'Pays',
  'Métier',
  'Prénom',
  'Fruit/légume',
  'Ville',
  'Marque',
  'Objet',
  'Célébrité',
  'Sport',
  'Fleuve ou rivière',
  'Objet de couleur bleu',
  'Cadeau pour une épouse',
  'Plat',
  'Partie du corps',
  'Mot au hasard',
  'Fromage',
  'Qui est vert',
  'Maladies',
  'Pokémon',
  'Marque alimentaire',
  'Instrument de musique',
  'Objet du quotidien',
  'Objet éléctronique',
  'Cadeau pour un mari',
  'Types de musique',
  'Super héro',
  'Cadeau pour une petite amie',
  'Animaux marins',
];

export default function Room({ params: { id } }: { params: { id: string } }) {
  return (
    <main className="px-72 pt-5 space-y-8">
      <WaitingRoom id={id} categories={CATEGORIES} />
    </main>
  );
}

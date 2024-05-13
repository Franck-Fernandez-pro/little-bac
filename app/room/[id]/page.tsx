import CopyClipboard from '@/components/CopyClipboard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { headers } from 'next/headers';

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
  const heads = headers();
  const url = heads.get('referer') || '';

  return (
    <main className="px-72 pt-5 space-y-8">
      <h1>Nouvelle partie</h1>

      <section>
        <h2>Catégories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c, idx) => (
            <Badge key={idx}>{c}</Badge>
          ))}
        </div>
      </section>

      <section>
        <h2>Lien de la partie</h2>
        <div className="flex w-full max-w-lg items-center space-x-2">
          <Input type="text" value={url} disabled />
          <CopyClipboard text={url} />
        </div>
      </section>
    </main>
  );
}

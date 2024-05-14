import { RoomPath } from '@/components/RoomPath';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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

const FAKE_USERS = [
  { _id: '0', avatar: 'https://github.com/shadcn.pngqsdqsd' },
  { _id: '1', avatar: 'https://github.com/shadcn.png' },
  { _id: '2', avatar: 'https://github.com/shadcn.png' },
];

export default function Room({ params: { id } }: { params: { id: string } }) {
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
        <RoomPath />
      </section>

      <section>
        <h2>Participants</h2>
        <div className="flex flex-wrap gap-3">
          {FAKE_USERS.map(({ _id, avatar }) => (
            <Avatar key={_id} className="size-14">
              <AvatarImage src={avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </section>
    </main>
  );
}

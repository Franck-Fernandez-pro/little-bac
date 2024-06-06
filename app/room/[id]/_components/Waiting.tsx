import { Badge } from '@/components/ui/badge';
import Participants from './Participants';

export default function WaitingRoom({
  id,
  categories,
}: {
  id: string;
  categories: string[];
}) {
  return (
    <div>
      <h1>Nouvelle partie</h1>

      <section>
        <h2>Catégories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c, idx) => (
            <Badge key={idx}>{c}</Badge>
          ))}
        </div>
      </section>

      {/* <section>
        <h2>Lien de la partie</h2>
        <RoomPath />
      </section> */}

      <Participants roomId={id} />
    </div>
  );
}

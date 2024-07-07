import RoomForm from '@/components/RoomForm';
import Rooms from '@/components/Rooms';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col xl:flex-row gap-8 p-4 md:p-8">
      <RoomForm className="w-full max-w-xs" />
      <Rooms className="flex-1" />
    </main>
  );
}

import RoomForm from '@/components/RoomForm';
import Rooms from '@/components/Rooms';

export default function Home() {
  return (
    <main className="flex justify-between w-full mt-5 px-10">
      <Rooms className="" />
      <RoomForm className="min-w-72" />
    </main>
  );
}

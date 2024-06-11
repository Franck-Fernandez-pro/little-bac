import RoomForm from '@/components/RoomForm';
import Rooms from '@/components/Rooms';

export default function Home() {
  return (
    <main className="flex flex-col-reverse xl:flex-row xl:justify-between w-full my-5 px-6 gap-6">
      <Rooms className="" />
      <RoomForm className="xl:border-l xl:border-b-0 border-b pb-7 w-full xl:pl-10 max-w-[400px] px-auto" />
    </main>
  );
}

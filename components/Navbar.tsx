import Link from 'next/link';
import { ModeToggle } from './ThemeButton';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-5">
      <Link href="/" className="font-bold">
        LittleBac
      </Link>
      <ModeToggle />
    </nav>
  );
}

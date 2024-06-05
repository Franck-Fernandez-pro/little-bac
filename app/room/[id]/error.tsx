'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-7 mt-20">
      <h1 className="next-error-h1">Something went wrong!</h1>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}

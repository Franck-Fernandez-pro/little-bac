'use client';

import { Button } from '@/components/ui/button';
import { ClipboardCheck, ClipboardCopy } from 'lucide-react';
import { useState } from 'react';

export default function CopyClipboard({ text }: { text: string }) {
  const className = 'size-4';
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <Button onClick={copy} size="icon">
      {copied ? (
        <ClipboardCheck className={className} />
      ) : (
        <ClipboardCopy className={className} />
      )}
    </Button>
  );
}

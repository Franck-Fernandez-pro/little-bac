'use client';

import { Input } from './ui/input';
import CopyClipboard from './CopyClipboard';

export function RoomPath() {
  const url = window.location.href;
  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <Input type="text" value={url} disabled />
      <CopyClipboard text={url} />
    </div>
  );
}

'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LoaderCircle, User } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { patchUser } from '@/actions/patchUser';
import { useContext, useEffect } from 'react';
import { UserContext } from './providers/UserProvider';
import { useToast } from './ui/use-toast';

export function UserDialog() {
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const [state, formAction] = useFormState(patchUser, {
    errors: {},
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: '✅ Succès',
        description: 'Vos préférences ont été mises à jour.',
      });
    }
  }, [state.success]);

  return user?._id ? (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Préférences</AlertDialogTitle>
          </AlertDialogHeader>

          <Label className="grid w-full items-center gap-1.5">
            Nom d'utilisateur
            <Input
              name="name"
              type="text"
              placeholder="John Doe"
              defaultValue={user?.name}
            />
            {state.errors?.name && (
              <span className="text-red-500 text-sm">{state.errors.name}</span>
            )}
          </Label>

          <input name="userId" type="hidden" value={user?._id} />

          <AlertDialogFooter className="mt-10">
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <Submit />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <></>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin" /> : 'Mettre à jour'}
    </Button>
  );
}

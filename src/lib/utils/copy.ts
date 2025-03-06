import { CircleCheckBig, CircleOff } from 'lucide-svelte';
import { toast } from 'svelte-sonner';

export function copy(itemName: string, content: string | number) {
  navigator.clipboard
    .writeText(content as string)
    .then(() => {
      console.info(`Successfully copied ${itemName} to clipboard`);
      toast(`Successfully copied ${itemName} to clipboard.`, {
        duration: 3000,
        icon: CircleCheckBig,
      });
    })
    .catch((e) => {
      console.error(`Error copying ${itemName}: ${(e as Error).message}`);
      toast(`Failed to copy ${itemName}.`, {
        duration: 3000,
        icon: CircleOff,
      });
    });
}

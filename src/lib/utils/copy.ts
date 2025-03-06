export function copy(itemName: string, content: string | number) {
  navigator.clipboard
    .writeText(content as string)
    .then(() => {
      console.info(`Successfully copied ${itemName} to clipboard`);
      // dispatchToast('Successfully copied to clipboard.', true);
    })
    .catch((e) => {
      console.error(`Error copying ${itemName}: ${(e as Error).message}`);
      // dispatchToast('Copying failed. (See console)', false);
    });
}

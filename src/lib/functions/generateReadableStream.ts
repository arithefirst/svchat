export async function generateStream(file: File): Promise<boolean> {
  try {
    await fetch(`/api/upload/`, {
      method: 'POST',
      body: file,
    });

    return true;
  } catch (e) {
    console.error(`Error sending stream: ${(e as Error).message}`);
    return false;
  }
}

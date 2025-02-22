export async function generateStream(file: File): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    await fetch(`/api/set-profile-photo/`, {
      method: 'POST',
      body: formData,
    });

    return true;
  } catch (e) {
    console.error(`Error sending stream: ${(e as Error).message}`);
    return false;
  }
}

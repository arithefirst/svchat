export async function generateStream(file: File): Promise<Response> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`/api/set-profile-photo/`, {
    method: 'POST',
    body: formData,
  });

  return res;
}

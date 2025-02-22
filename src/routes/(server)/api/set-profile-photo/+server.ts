import { error, json } from '@sveltejs/kit';
import { auth } from '$lib/server/db/auth';
import { authdb } from '$lib/server/db/sqlite';
import { fsClient } from '$lib/server/storage/minio-client';
import { Readable } from 'stream';

export const POST = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return error(401, 'Not authorized. Please sign up at /sign-up');
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return error(400, 'No file provided');
    }

    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    const uploadResponse = await fsClient?.uploadProfile(stream, file.type);
    authdb.setUserImage(session.user.id, `/api/images/${uploadResponse?.objectId}`);
    console.log(`\x1b[35m[S3]\x1b[0m Uploaded ${file.name} as ${uploadResponse?.objectId}`);

    return json(uploadResponse);
  } catch (e) {
    console.error(e);
    return error(500, (e as Error).message);
  }
};

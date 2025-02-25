import { fsClient } from '$lib/server/storage/minio-client';
import { error } from '@sveltejs/kit';

export const GET = async ({ params }) => {
  const { filename } = params;

  try {
    const stream = await fsClient?.fetchProfilePhoto(filename);
    if (!stream) {
      return error(404, { message: 'File not found' });
    }

    const readableStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => {
          if (controller.desiredSize !== null && controller.desiredSize > 0) {
            controller.enqueue(chunk);
          }
        });
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': `image/${filename.split('.').pop()}`,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch {
    return error(404, { message: 'File not found' });
  }
};

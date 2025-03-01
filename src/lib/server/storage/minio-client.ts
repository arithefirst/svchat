import 'dotenv/config';
import * as Minio from 'minio';
import { Readable } from 'stream';
import { v4 } from 'uuid';

type ClientParams = {
  endPoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
};

class MinioClient {
  private client: Minio.Client;

  constructor(params: ClientParams) {
    this.client = new Minio.Client({
      endPoint: params.endPoint,
      port: params.port,
      useSSL: params.useSSL,
      accessKey: params.accessKey,
      secretKey: params.secretKey,
    });
  }

  private getFileExtension(mimetype: string): string {
    switch (mimetype) {
      case 'image/jpeg':
        return '.jpg';
      case 'image/png':
        return '.png';
      default:
        throw new Error('Unsupported file type');
    }
  }

  async fetchProfilePhoto(objectId: string) {
    try {
      const bucket = 'profile-photos';
      const object = await this.client.getObject(bucket, objectId);
      return object;
    } catch (e) {
      console.error(`Error fetching file: ${(e as Error).message}`);
      throw e;
    }
  }

  async uploadProfile(stream: Readable, mime: string) {
    try {
      const bucket = 'profile-photos';
      if (!(await this.client.bucketExists(bucket))) {
        console.log(`\x1b[35m[S3]\x1b[0m Creating bucket '${bucket}', as it is required but does not exist.`);
        try {
          await this.client.makeBucket(bucket);
        } catch (e) {
          console.error((e as Error).message);
        }
      }

      const objectId = `${v4()}${this.getFileExtension(mime)}`;
      const upload = await this.client.putObject(bucket, objectId, stream);
      return {
        bucket,
        objectId,
        etag: upload.etag,
      };
    } catch (e) {
      if ((e as Error).message !== 'Unsupported file type') {
        console.error(`Error uploading file: ${(e as Error).message}`);
      }
      throw e;
    }
  }
}

let fsClient: MinioClient | undefined;

if (process.env.BUILDING !== 'true') {
  if (!process.env.MINIO_ROOT_USER || !process.env.MINIO_ROOT_PASSWORD) {
    console.error('Missing Minio username or password. Exiting.');
    process.exit(1);
  }

  fsClient = new MinioClient({
    // Endpoint is 'minio' in compose, 'localhost' everywhere else
    endPoint: process.env.NODE_ENV === 'docker_production' ? 'minio' : 'localhost',
    port: 9000,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    useSSL: false,
  });
}

export { fsClient };

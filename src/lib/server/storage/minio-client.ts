import * as Minio from 'minio';
import { Readable } from 'stream';
import { v4 } from 'uuid';

interface ClientParams {
  endPoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
}

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
      if (await !this.client.bucketExists(bucket)) {
        await this.client.makeBucket(bucket, 'us-east-1');
        console.log('Bucket "' + bucket + '" created in "us-east-1".');
      }

      const objectId = `${v4()}${this.getFileExtension(mime)}`;
      const upload = await this.client.putObject(bucket, objectId, stream);
      return {
        bucket,
        objectId,
        etag: upload.etag,
      };
    } catch (e) {
      console.error(`Error uploading file: ${(e as Error).message}`);
      throw e;
    }
  }
}

let fsClient: MinioClient | undefined;

if (process.env.BUILDING !== 'true') {
  fsClient = new MinioClient({
    endPoint: 'localhost',
    port: 9000,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    useSSL: false,
  });
}

export { fsClient };

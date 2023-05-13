import S3 from 'aws-sdk/clients/s3';

import env from '~/config/env';


export class S3Service {
  private bucketName: string;
  private region: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private s3Client;

  constructor() {
    this.bucketName = env.AWS_BUCKET_NAME;
    this.region = env.AWS_BUCKET_REGION;
    this.accessKeyId = env.AWS_ACCESS_KEY;
    this.secretAccessKey = env.AWS_SECRET;
    console.log('bucket', this.bucketName);
    console.log('bucket', this.region);
    console.log('bucket', this.accessKeyId);
    this.s3Client = new S3({
      accessKeyId: this.accessKeyId,
      region: this.region,
      secretAccessKey: this.secretAccessKey,
    });
  }

  public async uploadFile(buffer: any, body: any): Promise<S3.ManagedUpload.SendData> {
    const uploadParams: S3.PutObjectRequest = {
      Body: buffer,
      Bucket: this.bucketName,
      // ContentEncoding: 'base64',
      ContentType: 'image/png',
      Key: body.name,
    };
    const res = this.s3Client.putObject(uploadParams).promise();
    console.log(res);
    return res;
  }
}

import type S3 from 'aws-sdk/clients/s3';

export interface IS3Service {
   uploadFile: (body: any) => Promise<S3.ManagedUpload.SendData> 
}

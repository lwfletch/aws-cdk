import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number){
    super(scope, id)

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(expiration)
      }]
    })
  }

}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new CfnBucket(this, 'MyL1LewisBucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'enabled'
        }]
      }
    })


    new Bucket(this, 'MyBucketTreyL2', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(2)
      }]
    })

    new L3Bucket(this, 'MyL3BucketLewis', 3)
  }
}

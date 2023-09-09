import type { AWS } from '@serverless/typescript';

import listspecies from '@functions/list-species';
import addspecies from '@functions/add-species';

const serverlessConfiguration: AWS = {
  service: 'swapi-svc',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DYNAMODB_TABLE: 'dyn-rm-swapi-02',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}',
      },
    ],
  },
  // import the function via paths
  functions: { listspecies, addspecies },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  // create dynamodb table named 'dyn-rm-swapi-02'
  resources: {
    Resources: {
      DynRmSwapi01: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'dyn-rm-swapi-02',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'N',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  }
};

module.exports = serverlessConfiguration;

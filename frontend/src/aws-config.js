import awsmobile from './aws-exports';

/* eslint-disable */
const awsconfig = {
  aws_project_region: awsmobile.aws_project_region,
  aws_cognito_identity_pool_id: awsmobile.aws_cognito_identity_pool_id,
  aws_cognito_region: awsmobile.aws_cognito_region,
  aws_user_pools_id: awsmobile.aws_user_pools_id,
  aws_user_pools_web_client_id: awsmobile.aws_user_pools_web_client_id,
  oauth: awsmobile.oauth,
  aws_user_files_s3_bucket: awsmobile.aws_user_files_s3_bucket,
  aws_user_files_s3_bucket_region: awsmobile.aws_user_files_s3_bucket_region,
};

export default awsconfig;

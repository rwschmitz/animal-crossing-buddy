import Amplify from 'aws-amplify';
import awsconfig from '../../aws-config';

const initAmplify = (): void => {
  Amplify.configure(awsconfig);
};

export { initAmplify };

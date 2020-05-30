import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

const initAmplify = (): void => {
  Amplify.configure(awsconfig);
};

export { initAmplify };

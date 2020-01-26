import { environment, EnvTypes } from '../constants/constants';

export default (operation: string, params: string): void | null =>
  environment !== EnvTypes.DEV
    ? null
    : console.log(
        ` OPERATION: ${operation}
    TIMESTAMP: ${new Date()}
    ENVIRONMENT: ${environment}
    PARAMETERS: `,
        params
      );

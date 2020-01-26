import { environment, EnvTypes } from '../constants/environments';

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

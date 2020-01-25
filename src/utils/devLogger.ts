import { environment } from '../constants/constants';

export default (operation: string, params: string): void =>
  console.log(
    ` OPERATION: ${operation}
    TIMESTAMP: ${new Date()}
    ENVIRONMENT: ${environment}
    PARAMETERS: `,
    params
  );

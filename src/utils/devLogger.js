import { environment } from '../constants';

export default (operation, params) => console.log(
  ` OPERATION: ${operation}
    TIMESTAMP: ${new Date()}
    ENVIRONMENT: ${environment}
    PARAMETERS: `, params
);

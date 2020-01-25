export enum EnvTypes {
  PROD = 'production',
  DEV = 'development',
  TEST = 'test',
}

export const environment: EnvTypes = (process.env.NODE_ENV as EnvTypes) || EnvTypes.DEV;

export const encryptionConstants = {
  secret: process.env.SERVER_SECRET_KEY,
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export const ACCESS_TOKEN = 'access_token';

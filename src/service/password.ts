import bcrypt from 'bcrypt';
import config from '../config';
export const hashingPassword = async (password: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const passwordHash = await bcrypt.hash(
        password,
        config.ROUNDED_SALT_BCRYPT ?? 10
      );
      resolve(passwordHash);
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });

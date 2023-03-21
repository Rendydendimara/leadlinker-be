import { connect, ConnectOptions } from 'mongoose';
import config from '../config';

export const MONGO_URI = config.MONGO_URI ?? '';
const options: ConnectOptions = {
  autoIndex: true,
  autoCreate: true,
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // reconnectTries: 30, // Retry up to 30 times
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0
  // useFindAndModify: false,
};
const connectDB = (cb: Function) => {
  connect(MONGO_URI, options)
    .then(() => {
      cb();
    })
    .catch((error: any) => {
      console.error(error);
      process.exit(1);
    });
};

export default connectDB;

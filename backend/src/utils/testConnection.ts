import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const uri = process.env.MONGODB_URI!;
console.log('URI (masked):', uri.replace(/:([^:@]+)@/, ':****@'));
console.log('Attempting full replica set connection...');

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 15000 })
  .then((conn) => {
    console.log('✅ SUCCESS — connected to:', conn.connection.host);
    return mongoose.disconnect();
  })
  .then(() => { console.log('Test PASSED.'); process.exit(0); })
  .catch((err) => { console.error('❌ ERROR:', err.message); process.exit(1); });

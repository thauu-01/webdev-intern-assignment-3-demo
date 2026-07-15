/**
 * Migration: createIndexes
 * ─────────────────────────
 * Ensures all required indexes exist on the `students` collection.
 *
 * Run:  npm run migrate
 *       (or: npx tsx src/migrations/createIndexes.ts)
 *
 * Safe to run multiple times — createIndex is idempotent.
 */

import dotenv from 'dotenv';
import path from 'path';

// Load .env before any other import that might need env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/database';
import Student from '../models/Student';

interface IndexResult {
  name: string;
  status: 'created' | 'already_exists' | 'error';
  error?: string;
}

async function createIndexes(): Promise<void> {
  console.log('🔧 Migration: createIndexes — starting…');
  console.log(`   Database: ${process.env.MONGODB_URI?.split('@')[1] ?? 'unknown'}\n`);

  await connectDB();

  const results: IndexResult[] = [];

  // ── 1. Unique index on sbd ─────────────────────────────────────────────────
  try {
    await Student.collection.createIndex(
      { sbd: 1 },
      {
        unique: true,
        name:   'sbd_unique',
        background: true,
      }
    );
    results.push({ name: 'sbd_unique', status: 'created' });
    console.log('  ✅ Index created  : sbd_unique (unique)');
  } catch (err: unknown) {
    // Error code 85 = IndexOptionsConflict, 86 = IndexKeySpecsConflict
    // Error code 11000 = duplicate key — index already exists
    const mongoErr = err as { code?: number; message?: string };
    if (mongoErr.code === 85 || mongoErr.code === 86 || mongoErr.code === 11000) {
      results.push({ name: 'sbd_unique', status: 'already_exists' });
      console.log('  ⏭  Index exists   : sbd_unique — skipping');
    } else {
      results.push({ name: 'sbd_unique', status: 'error', error: mongoErr.message });
      console.error('  ❌ Index failed   : sbd_unique', err);
    }
  }

  // ── 2. Compound index for Group A ranking query ────────────────────────────
  // Filters: vat_li != null, hoa_hoc != null, toan != null
  // Sort by total (toan + vat_li + hoa_hoc) — MongoDB can't index computed fields,
  // so we index each field individually for the $match stage.
  try {
    await Student.collection.createIndex(
      { toan: -1, vat_li: -1, hoa_hoc: -1 },
      {
        name:       'group_a_ranking',
        background: true,
        partialFilterExpression: {
          toan:    { $type: 'number' },
          vat_li:  { $type: 'number' },
          hoa_hoc: { $type: 'number' },
        },
      }
    );
    results.push({ name: 'group_a_ranking', status: 'created' });
    console.log('  ✅ Index created  : group_a_ranking (partial, compound)');
  } catch (err: unknown) {
    const mongoErr = err as { code?: number; message?: string };
    if (mongoErr.code === 85 || mongoErr.code === 86) {
      results.push({ name: 'group_a_ranking', status: 'already_exists' });
      console.log('  ⏭  Index exists   : group_a_ranking — skipping');
    } else {
      results.push({ name: 'group_a_ranking', status: 'error', error: mongoErr.message });
      console.error('  ❌ Index failed   : group_a_ranking', err);
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  const created  = results.filter((r) => r.status === 'created').length;
  const skipped  = results.filter((r) => r.status === 'already_exists').length;
  const failed   = results.filter((r) => r.status === 'error').length;

  console.log('\n── Summary ───────────────────────────────────────────────');
  console.log(`   Created : ${created}`);
  console.log(`   Skipped : ${skipped}`);
  console.log(`   Failed  : ${failed}`);

  if (failed > 0) {
    console.error('\n❌ Migration completed with errors.');
    await disconnectDB();
    process.exit(1);
  }

  console.log('\n✅ Migration completed successfully.');

  // List all current indexes for verification
  const allIndexes = await Student.collection.indexes();
  console.log('\n── Current indexes on `students` ────────────────────────');
  allIndexes.forEach((idx) => {
    console.log(`   • ${idx.name}  →  ${JSON.stringify(idx.key)}`);
  });

  await disconnectDB();
}

createIndexes().catch(async (err) => {
  console.error('💥 Unhandled migration error:', err);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});

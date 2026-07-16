/**
 * Seeder: seedStudents
 * Chạy: npm run seed
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/database';
import Student from '../models/Student';
import { parseScore, parseString, formatDuration } from '../utils/csvParser';


const CWD = process.cwd();  // D:\intern\webdev-intern-assignment-3\backend
const PROJECT_ROOT = path.resolve(CWD, '..');
const DEFAULT_CSV = path.join(PROJECT_ROOT, 'dataset', 'diem_thi_thpt_2024.csv');
const CSV_PATH = process.env.CSV_PATH
  ? path.resolve(CWD, process.env.CSV_PATH)
  : DEFAULT_CSV;
const BATCH_SIZE = parseInt(process.env.SEED_BATCH_SIZE ?? '1000', 10);
const LOG_EVERY = 50_000; // in progress mỗi N dòng

interface CsvRow {
  sbd: string;
  toan: string;
  ngu_van: string;
  ngoai_ngu: string;
  vat_li: string;
  hoa_hoc: string;
  sinh_hoc: string;
  lich_su: string;
  dia_li: string;
  gdcd: string;
  ma_ngoai_ngu: string;
}

// ── Main ────
async function seed(): Promise<void> {
  console.log('🌱 Seeder: seedStudents — starting…');
  console.log(`   CSV    : ${CSV_PATH}`);
  console.log(`   Batch  : ${BATCH_SIZE.toLocaleString()} rows/insert\n`);

  // Kiểm tra file CSV tồn tại
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ CSV file not found: ${CSV_PATH}`);
    process.exit(1);
  }

  await connectDB();

  // ── Stats ──────────
  let totalRead = 0;
  let totalInserted = 0;
  let totalSkipped = 0;  // duplicate key
  let totalErrors = 0;  // other errors
  let batch: object[] = [];

  const startTime = Date.now();

  // ── insertBatch helper ────────
  const insertBatch = async (): Promise<void> => {
    if (batch.length === 0) return;

    try {
      const result = await Student.insertMany(batch, {
        ordered: false,        // tiếp tục insert dù có duplicate
        lean: true,
      });
      totalInserted += result.length;
    } catch (err: unknown) {
      // MongoBulkWriteError — một số docs bị skip (duplicate key E11000)
      const bulkErr = err as {
        code?: number;
        insertedCount?: number;
        writeErrors?: Array<{ code: number }>;
      };

      if (bulkErr.code === 11000 || (bulkErr.writeErrors && bulkErr.writeErrors.length > 0)) {
        const inserted = bulkErr.insertedCount ?? 0;
        const skipped = (bulkErr.writeErrors ?? []).filter((e) => e.code === 11000).length;
        const otherErrs = (bulkErr.writeErrors ?? []).filter((e) => e.code !== 11000).length;

        totalInserted += inserted;
        totalSkipped += skipped;
        totalErrors += otherErrs;

        if (otherErrs > 0) {
          console.warn(`   ⚠️  ${otherErrs} non-duplicate errors in batch`);
        }
      } else {
        // Lỗi không liên quan đến duplicate — nghiêm trọng
        console.error('❌ Batch insert failed:', err);
        throw err;
      }
    }

    batch = [];
  };

  // ── Stream CSV ────────────
  await new Promise<void>((resolve, reject) => {
    const stream = fs.createReadStream(CSV_PATH).pipe(csv({ skipComments: true }));

    stream.on('data', (row: CsvRow) => {
      totalRead++;

      // Chuyển đổi dữ liệu CSV → document MongoDB
      const doc = {
        sbd: row.sbd?.trim(),
        toan: parseScore(row.toan),
        ngu_van: parseScore(row.ngu_van),
        ngoai_ngu: parseScore(row.ngoai_ngu),
        ma_ngoai_ngu: parseString(row.ma_ngoai_ngu),
        vat_li: parseScore(row.vat_li),
        hoa_hoc: parseScore(row.hoa_hoc),
        sinh_hoc: parseScore(row.sinh_hoc),
        lich_su: parseScore(row.lich_su),
        dia_li: parseScore(row.dia_li),
        gdcd: parseScore(row.gdcd),
      };

      // Bỏ qua dòng không có sbd
      if (!doc.sbd) {
        totalSkipped++;
        return;
      }

      batch.push(doc);

      // In tiến độ
      if (totalRead % LOG_EVERY === 0) {
        const elapsed = formatDuration(Date.now() - startTime);
        const rate = Math.round(totalRead / ((Date.now() - startTime) / 1000));
        console.log(
          `   📊 ${totalRead.toLocaleString().padStart(9)} rows read` +
          ` | inserted: ${totalInserted.toLocaleString().padStart(7)}` +
          ` | skipped: ${totalSkipped.toLocaleString().padStart(6)}` +
          ` | ${rate.toLocaleString()} rows/s | ${elapsed}`
        );
      }

      // Khi đủ batch → pause stream, insert, rồi resume
      if (batch.length >= BATCH_SIZE) {
        stream.pause();
        insertBatch()
          .then(() => stream.resume())
          .catch((err) => reject(err));
      }
    });

    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve());
  });


  // Insert batch cuối cùng còn dư
  await insertBatch();

  // ── Final Summary ──────────────────────────
  const totalTime = formatDuration(Date.now() - startTime);

  console.log('\n── Seeder Summary ───────────────────────');
  console.log(`   Total read     : ${totalRead.toLocaleString()}`);
  console.log(`   Inserted       : ${totalInserted.toLocaleString()}`);
  console.log(`   Skipped (dup)  : ${totalSkipped.toLocaleString()}`);
  console.log(`   Errors         : ${totalErrors.toLocaleString()}`);
  console.log(`   Duration       : ${totalTime}`);
  console.log('──────────────────');

  // Verify count trong DB
  const dbCount = await Student.countDocuments();
  console.log(`\n📦 Documents in DB: ${dbCount.toLocaleString()}`);

  if (totalErrors > 0) {
    console.warn('\n⚠️  Seeder completed with errors.');
  } else {
    console.log('\n✅ Seeder completed successfully.');
  }

  await disconnectDB();
}

// ── Bootstrap ─────────────────────────
seed().catch(async (err) => {
  console.error('💥 Seeder crashed:', err);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});

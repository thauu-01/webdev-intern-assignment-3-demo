import { Router } from 'express';
import { getReport } from '../controllers/report.controller';
import {
  validateReportQuery,
  handleReportValidationErrors,
} from '../validators/report.validator';

const router = Router();

/**
 * GET /api/report?subject=<optional>
 *
 * Middleware chain:
 *   1. validateReportQuery        — kiểm tra subject key hợp lệ (nếu có)
 *   2. handleReportValidationErrors — trả 400 nếu lỗi
 *   3. getReport                  — tính thống kê
 */
router.get(
  '/',
  validateReportQuery,
  handleReportValidationErrors,
  getReport
);

export default router;

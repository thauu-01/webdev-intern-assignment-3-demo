import { Router } from 'express';
import { getStudentByRegistrationNumber } from '../controllers/student.controller';
import {
  validateRegistrationNumber,
  handleValidationErrors,
} from '../validators/student.validator';

const router = Router();

/**
 * GET /api/students/:registrationNumber
 * Middleware chain:
 *   1. validateRegistrationNumber — kiểm tra format (8 chữ số)
 *   2. handleValidationErrors     — trả 400 nếu lỗi
 *   3. getStudentByRegistrationNumber — query DB, trả 200/404
 */
router.get(
  '/:registrationNumber',
  validateRegistrationNumber,
  handleValidationErrors,
  getStudentByRegistrationNumber
);

export default router;

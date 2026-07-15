import { query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { SubjectRegistry } from '../domain/SubjectRegistry';

const registry = SubjectRegistry.getInstance();

/**
 * Validate query param ?subject=<key>
 *
 * - Nếu không truyền → thống kê TẤT CẢ môn
 * - Nếu truyền → phải là key hợp lệ trong SubjectRegistry
 */
export const validateReportQuery = [
  query('subject')
    .optional()
    .trim()
    .custom((value: string) => {
      if (value && !registry.hasKey(value)) {
        const valid = registry.getAllKeys().join(', ');
        throw new Error(`Môn học không hợp lệ. Các môn hợp lệ: ${valid}`);
      }
      return true;
    }),
];

export const handleReportValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Tham số không hợp lệ',
      errors: errors.array().map((e) => ({
        field:   e.type === 'field' ? e.path : 'unknown',
        message: e.msg,
      })),
    });
    return;
  }

  next();
};

import { param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Quy tắc validate số báo danh:
 *  - Bắt buộc có mặt trong URL param
 *  - Chỉ gồm chữ số (0-9)
 *  - Độ dài: 8 ký tự (format thực tế trong CSV: 01000001)
 */
export const validateRegistrationNumber = [
  param('registrationNumber')
    .trim()
    .notEmpty()
    .withMessage('Số báo danh không được để trống')
    .isNumeric()
    .withMessage('Số báo danh chỉ được chứa chữ số')
    .isLength({ min: 8, max: 8 })
    .withMessage('Số báo danh phải có đúng 8 chữ số'),
];

/**
 * Middleware kiểm tra kết quả validation.
 * Nếu có lỗi → trả 400 với danh sách lỗi chi tiết.
 * Nếu hợp lệ → gọi next() để tiếp tục.
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Số báo danh không hợp lệ',
      errors: errors.array().map((e) => ({
        field:   e.type === 'field' ? e.path : 'unknown',
        message: e.msg,
      })),
    });
    return;
  }

  next();
};

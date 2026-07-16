import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/student.service';

const studentService = new StudentService();

/**
 * GET /api/students/:registrationNumber
 * Tra cứu điểm theo số báo danh.
 * Response:
 *   200 — tìm thấy, trả về StudentResult
 *   400 — sbd sai định dạng (handled by validator middleware)
 *   404 — không tìm thấy học sinh
 *   500 — lỗi server
 */
export const getStudentByRegistrationNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const registrationNumber = String(req.params.registrationNumber);
    const result = await studentService.findByRegistrationNumber(registrationNumber);

    if (!result) {
      res.status(404).json({
        success: false,
        message: `Không tìm thấy thí sinh có số báo danh "${registrationNumber}"`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error); // global error handler
  }
};

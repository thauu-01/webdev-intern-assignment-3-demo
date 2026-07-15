import { Request, Response, NextFunction } from 'express';
import { ReportService } from '../services/report.service';

const reportService = new ReportService();

/**
 * GET /api/report?subject=<optional>
 *
 * Response:
 *   200 — trả về mảng SubjectReport (1 môn hoặc tất cả)
 *   400 — subject key không hợp lệ (handled by validator)
 *   500 — lỗi server
 */
export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subjectKey = req.query.subject as string | undefined;
    const data = await reportService.getReport(subjectKey || undefined);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

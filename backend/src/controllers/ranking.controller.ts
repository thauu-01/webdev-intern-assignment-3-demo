import { Request, Response, NextFunction } from 'express';
import { RankingService } from '../services/ranking.service';

const rankingService = new RankingService();

/**
 * GET /api/top10/group-a - Trả về danh sách Top 10 học sinh khối A có điểm cao nhất
 */
export const getTop10GroupA = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await rankingService.getTop10GroupA();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

import { Router } from 'express';
import { getTop10GroupA } from '../controllers/ranking.controller';

const router = Router();

/**
 * GET /api/top10/group-a
 */
router.get('/group-a', getTop10GroupA);

export default router;

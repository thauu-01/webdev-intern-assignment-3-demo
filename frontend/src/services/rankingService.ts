import apiClient from './apiClient';
import type { ApiResponse, RankedStudent } from '../types';

export const rankingService = {
  /**
   * Lấy top 10 học sinh khối A
   */
  getTop10GroupA: async (): Promise<RankedStudent[]> => {
    const response = await apiClient.get<ApiResponse<RankedStudent[]>>('/top10/group-a');
    return response.data.data;
  },
};

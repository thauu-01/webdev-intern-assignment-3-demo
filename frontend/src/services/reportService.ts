import apiClient from './apiClient';
import type { ApiResponse, SubjectReport } from '../types';

export const reportService = {
  /**
   * Lấy báo cáo thống kê tất cả các môn hoặc theo môn học cụ thể
   */
  getReport: async (subject?: string): Promise<SubjectReport[]> => {
    const url = subject ? `/report?subject=${subject}` : '/report';
    const response = await apiClient.get<ApiResponse<SubjectReport[]>>(url);
    return response.data.data;
  },
};

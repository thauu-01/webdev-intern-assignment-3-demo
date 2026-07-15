import apiClient from './apiClient';
import type { ApiResponse, StudentResult } from '../types';

export const studentService = {
  /**
   * Tra cứu điểm thí sinh theo số báo danh
   */
  getBySbd: async (sbd: string): Promise<StudentResult> => {
    const response = await apiClient.get<ApiResponse<StudentResult>>(`/students/${sbd}`);
    return response.data.data;
  },
};

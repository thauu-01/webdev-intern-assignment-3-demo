import { Subject } from '../Subject';

/**
 * CivicsSubject — Môn Giáo dục công dân
 * Môn tự chọn xã hội, 
 */
export class CivicsSubject extends Subject {
  readonly key = 'gdcd';
  readonly label = 'GDCD';

  isCoreSubjectFor(_group: string): boolean {
    return false;
  }
}

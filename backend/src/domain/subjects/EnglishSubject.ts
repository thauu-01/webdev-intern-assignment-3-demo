import { Subject } from '../Subject';

/**
 * EnglishSubject — Môn Ngoại ngữ
 * Thuộc khối: A1 (Toán-Lý-Anh), D (Toán-Văn-Anh)
 */
export class EnglishSubject extends Subject {
  readonly key   = 'ngoai_ngu';
  readonly label = 'Ngoại ngữ';

  isCoreSubjectFor(group: string): boolean {
    return ['A1', 'D'].includes(group.toUpperCase());
  }
}

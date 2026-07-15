import { Subject } from '../Subject';

/**
 * LiteratureSubject — Môn Ngữ văn
 * Thuộc khối: C (Văn-Sử-Địa), D (Toán-Văn-Anh)
 */
export class LiteratureSubject extends Subject {
  readonly key   = 'ngu_van';
  readonly label = 'Ngữ văn';

  isCoreSubjectFor(group: string): boolean {
    return ['C', 'D'].includes(group.toUpperCase());
  }
}

import { Subject } from '../Subject';

/**
 * GeographySubject — Môn Địa lí
 * Thuộc khối: C (Văn-Sử-Địa)
 */
export class GeographySubject extends Subject {
  readonly key   = 'dia_li';
  readonly label = 'Địa lí';

  isCoreSubjectFor(group: string): boolean {
    return ['C'].includes(group.toUpperCase());
  }
}

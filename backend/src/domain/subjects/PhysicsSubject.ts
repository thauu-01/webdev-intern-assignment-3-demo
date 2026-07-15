import { Subject } from '../Subject';

/**
 * PhysicsSubject — Môn Vật lí
 * Thuộc khối: A (Toán-Lý-Hóa), A1 (Toán-Lý-Anh)
 */
export class PhysicsSubject extends Subject {
  readonly key   = 'vat_li';
  readonly label = 'Vật lí';

  isCoreSubjectFor(group: string): boolean {
    return ['A', 'A1'].includes(group.toUpperCase());
  }
}

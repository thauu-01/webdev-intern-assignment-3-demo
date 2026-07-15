/**
 * Domain layer barrel export.
 * Import từ domain bằng: import { SubjectRegistry, ScoreLevel } from '@/domain'
 */
export { ScoreLevel, SCORE_LEVEL_LABELS, SCORE_THRESHOLDS } from './ScoreLevel';
export { Subject }          from './Subject';
export { SubjectRegistry }  from './SubjectRegistry';

// Subject subclasses (export để test hoặc dùng trực tiếp nếu cần)
export { MathSubject }       from './subjects/MathSubject';
export { LiteratureSubject } from './subjects/LiteratureSubject';
export { EnglishSubject }    from './subjects/EnglishSubject';
export { PhysicsSubject }    from './subjects/PhysicsSubject';
export { ChemistrySubject }  from './subjects/ChemistrySubject';
export { BiologySubject }    from './subjects/BiologySubject';
export { HistorySubject }    from './subjects/HistorySubject';
export { GeographySubject }  from './subjects/GeographySubject';
export { CivicsSubject }     from './subjects/CivicsSubject';

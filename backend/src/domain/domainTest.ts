/**
 * Smoke test cho Domain Layer
 * Chạy: npx tsx src/domain/domainTest.ts
 */
import { SubjectRegistry, ScoreLevel } from './index';

const registry = SubjectRegistry.getInstance();

console.log('══════════════════════════════════════════════');
console.log('  G-Scores — Domain Layer Smoke Test');
console.log('══════════════════════════════════════════════\n');

// 1. Tất cả môn
const all = registry.getAll();
console.log(`📚 Tổng số môn đăng ký: ${all.length}`);
all.forEach((s) => console.log(`   • ${s.key.padEnd(12)} → ${s.label}`));

// 2. Môn khối A
console.log('\n🔬 Môn khối A:');
registry.getGroupASubjects().forEach((s) => console.log(`   • ${s.label}`));

// 3. Classify điểm
console.log('\n🎯 Kiểm tra phân loại điểm:');
const math = registry.getByKey('toan')!;
const cases: [number, ScoreLevel][] = [
  [9.5, ScoreLevel.EXCELLENT],
  [7.0, ScoreLevel.GOOD],
  [5.0, ScoreLevel.AVERAGE],
  [3.0, ScoreLevel.POOR],
  [8.0, ScoreLevel.EXCELLENT], // boundary: 8 → EXCELLENT
  [6.0, ScoreLevel.GOOD],      // boundary: 6 → GOOD
  [4.0, ScoreLevel.AVERAGE],   // boundary: 4 → AVERAGE
];

let passed = 0;
for (const [score, expected] of cases) {
  const result = math.classify(score);
  const ok = result === expected;
  if (ok) passed++;
  console.log(`   ${ok ? '✅' : '❌'} classify(${score}) = ${result} (expected: ${expected})`);
}

// 4. isCoreSubjectFor
console.log('\n🏫 Kiểm tra isCoreSubjectFor:');
const checkGroup = [
  ['toan',    'A', true],
  ['toan',    'C', false],
  ['vat_li',  'A', true],
  ['hoa_hoc', 'A', true],
  ['hoa_hoc', 'B', true],
  ['ngu_van', 'D', true],
  ['ngu_van', 'A', false],
] as [string, string, boolean][];

for (const [key, group, expected] of checkGroup) {
  const subject = registry.getByKey(key)!;
  const result = subject.isCoreSubjectFor(group);
  const ok = result === expected;
  if (ok) passed++;
  console.log(`   ${ok ? '✅' : '❌'} ${key}.isCoreSubjectFor('${group}') = ${result}`);
}

// 5. Singleton check
const r2 = SubjectRegistry.getInstance();
const isSame = registry === r2;
console.log(`\n🔒 Singleton check: ${isSame ? '✅ PASS' : '❌ FAIL'} (same instance)`);

console.log(`\n══════════════════════════════════════════════`);
console.log(`Tổng: ${passed + (isSame ? 1 : 0)}/${cases.length + checkGroup.length + 1} tests passed`);
console.log('══════════════════════════════════════════════');

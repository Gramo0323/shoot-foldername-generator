import { test } from 'node:test';
import assert from 'node:assert';
import { formatFolderName } from '../src/formatter.js';

test('Formatter Logic', async (t) => {
    await t.test('Standard case', () => {
        const result = formatFolderName('2025-11-11', '', '田中玲美');
        assert.strictEqual(result.folderName, '251111_田中玲美様');
    });

    await t.test('With identifier A', () => {
        const result = formatFolderName('2025-11-11', 'A', '田中玲美');
        assert.strictEqual(result.folderName, '251111A_田中玲美様');
    });

    await t.test('With identifier B', () => {
        const result = formatFolderName('2025-11-11', 'B', '佐藤ゆか');
        assert.strictEqual(result.folderName, '251111B_佐藤ゆか様');
    });

    await t.test('Whitespace removal', () => {
        const result = formatFolderName('2025-11-11', 'A', ' 田 中　玲 美 ');
        assert.strictEqual(result.folderName, '251111A_田中玲美様');
    });

    await t.test('Add "様" suffix if missing', () => {
        const result = formatFolderName('2025-11-11', '', '田中');
        assert.strictEqual(result.folderName, '251111_田中様');
    });

    await t.test('Do not add "様" if already present', () => {
        const result = formatFolderName('2025-11-11', '', '田中様');
        assert.strictEqual(result.folderName, '251111_田中様');
    });

    await t.test('pbcopy command generation', () => {
        const result = formatFolderName('2025-11-11', 'A', '田中');
        assert.strictEqual(result.copyCommand, "printf '%s' '251111A_田中様' | pbcopy");
    });

    await t.test('Empty input returns empty', () => {
        const result = formatFolderName('', '', '');
        assert.strictEqual(result.folderName, '');
    });
});

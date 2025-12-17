/**
 * Format the output folder name and command.
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @param {string} identifier - Identifier (e.g., "", "A", "B")
 * @param {string} name - Customer name
 * @returns {object} { folderName, copyCommand }
 */
export function formatFolderName(dateStr, identifier, name) {
  if (!dateStr || !name) {
    return { folderName: '', copyCommand: '' };
  }

  // 1. Date (YYYY-MM-DD -> YYMMDD)
  // dateStr is usually "YYYY-MM-DD" from input[type="date"]
  const [year, month, day] = dateStr.split('-');
  const yymmdd = `${year.slice(2)}${month}${day}`;

  // 2. Identifier ("なし" or empty -> "")
  const idStr = identifier === 'なし' ? '' : identifier;

  // 3. Name Normalization
  // Remove all whitespace (including full-width space, tabs, etc.)
  let normalizedName = name.replace(/\s+/g, '');
  
  // Add "様" if not present
  if (!normalizedName.endsWith('様')) {
    normalizedName += '様';
  }

  // 4. Format
  const folderName = `${yymmdd}${idStr}_${normalizedName}`;

  // 5. Command
  // printf '%s' 'folderName' | pbcopy
  // Escape single quotes in folderName just in case (though file names strictly shouldn't have them usually, but good practice)
  const escapedName = folderName.replace(/'/g, "'\\''");
  const copyCommand = `printf '%s' '${escapedName}' | pbcopy`;

  return { folderName, copyCommand };
}

import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const SERVER = process.env.DB_SERVER || '.';
const DATABASE = process.env.DB_NAME || 'gpa';

/**
 * Escapes SQL string parameter to prevent SQL injection in dynamic statements
 */
export function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (typeof val === 'number') return val.toString();
  return "N'" + val.toString().replace(/'/g, "''") + "'";
}

/**
 * Executes a raw SQL query or command using local Microsoft SQL Server sqlcmd utility
 */
export async function executeSql(query) {
  try {
    // Flatten newlines so cmd.exe receives a single continuous command
    const escapedQuery = query.replace(/\r?\n/g, ' ').replace(/"/g, '""');
    const cmd = `sqlcmd -S "${SERVER}" -E -d "${DATABASE}" -y 0 -Q "${escapedQuery}"`;
    const { stdout, stderr } = await execPromise(cmd, { maxBuffer: 10 * 1024 * 1024 });
    if (stderr && !stderr.includes('Changed database context')) {
      console.warn('SQL execution notice:', stderr.trim());
    }
    return stdout ? stdout.trim() : '';
  } catch (err) {
    console.error('SQL Execution Error:', err.message);
    throw err;
  }
}

/**
 * Executes a query with FOR JSON PATH and parses the result into a JavaScript object/array
 */
export async function queryJson(query) {
  try {
    const jsonQuery = `SET NOCOUNT ON; ${query}`;
    const raw = await executeSql(jsonQuery);
    if (!raw) return null;

    // SQL Server FOR JSON splits long JSON into 2033-byte lines with newlines.
    // Joining all lines reconstructs the complete, uninterrupted JSON string.
    const joined = raw.split(/\r?\n/).join('').trim();
    if (!joined) return null;

    const firstBracket = joined.indexOf('[');
    const firstBrace = joined.indexOf('{');
    let startIdx = 0;
    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
      startIdx = firstBracket;
    } else if (firstBrace !== -1) {
      startIdx = firstBrace;
    }

    const cleanJson = joined.substring(startIdx);
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error('SQL queryJson Error on:', query, err.message);
    return null;
  }
}

/**
 * Test connectivity to SQL Server database
 */
export async function testConnection() {
  try {
    const result = await executeSql("SELECT @@SERVERNAME AS ServerName;");
    return { success: true, server: result.split('\n')[0] };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

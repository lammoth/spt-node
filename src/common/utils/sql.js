/**
 * Reserved word map.
 */

const reserved = new Set([
  'AES128',
  'AES256',
  'ALL',
  'ALLOWOVERWRITE',
  'ANALYSE',
  'ANALYZE',
  'AND',
  'ANY',
  'ARRAY',
  'AS',
  'ASC',
  'AUTHORIZATION',
  'BACKUP',
  'BETWEEN',
  'BINARY',
  'BLANKSASNULL',
  'BOTH',
  'BYTEDICT',
  'CASE',
  'CAST',
  'CHECK',
  'COLLATE',
  'COLUMN',
  'CONSTRAINT',
  'CREATE',
  'CREDENTIALS',
  'CROSS',
  'CURRENT_DATE',
  'CURRENT_TIME',
  'CURRENT_TIMESTAMP',
  'CURRENT_USER',
  'CURRENT_USER_ID',
  'DEFAULT',
  'DEFERRABLE',
  'DEFLATE',
  'DEFRAG',
  'DELTA',
  'DELTA32K',
  'DESC',
  'DISABLE',
  'DISTINCT',
  'DO',
  'ELSE',
  'EMPTYASNULL',
  'ENABLE',
  'ENCODE',
  'ENCRYPT',
  'ENCRYPTION',
  'END',
  'EXCEPT',
  'EXPLICIT',
  'FALSE',
  'FOR',
  'FOREIGN',
  'FREEZE',
  'FROM',
  'FULL',
  'GLOBALDICT256',
  'GLOBALDICT64K',
  'GRANT',
  'GROUP',
  'GZIP',
  'HAVING',
  'IDENTITY',
  'IGNORE',
  'ILIKE',
  'IN',
  'INITIALLY',
  'INNER',
  'INTERSECT',
  'INTO',
  'IS',
  'ISNULL',
  'JOIN',
  'LEADING',
  'LEFT',
  'LIKE',
  'LIMIT',
  'LOCALTIME',
  'LOCALTIMESTAMP',
  'LUN',
  'LUNS',
  'LZO',
  'LZOP',
  'MINUS',
  'MOSTLY13',
  'MOSTLY32',
  'MOSTLY8',
  'NATURAL',
  'NEW',
  'NOT',
  'NOTNULL',
  'NULL',
  'NULLS',
  'OFF',
  'OFFLINE',
  'OFFSET',
  'OLD',
  'ON',
  'ONLY',
  'OPEN',
  'OR',
  'ORDER',
  'OUTER',
  'OVERLAPS',
  'PARALLEL',
  'PARTITION',
  'PERCENT',
  'PLACING',
  'PRIMARY',
  'RAW',
  'READRATIO',
  'RECOVER',
  'REFERENCES',
  'REJECTLOG',
  'RESORT',
  'RESTORE',
  'RIGHT',
  'SELECT',
  'SESSION_USER',
  'SIMILAR',
  'SOME',
  'SYSDATE',
  'SYSTEM',
  'TABLE',
  'TAG',
  'TDES',
  'TEXT255',
  'TEXT32K',
  'THEN',
  'TO',
  'TOP',
  'TRAILING',
  'TRUE',
  'TRUNCATECOLUMNS',
  'UNION',
  'UNIQUE',
  'USER',
  'USING',
  'VERBOSE',
  'WALLET',
  'WHEN',
  'WHERE',
  'WITH',
  'WITHOUT',
])

/**
 * Format a string.
 *
 * @param {String} fmt
 * @param {any} args
 * @return {String}
 * @api public
 */

export function sqlFormat(fmt: string, ...args: any[]) {
  let i = 0
  return fmt.replace(/%([%tisq])/g, (_, type): string => {
    if ('%' === type) return '%'

    const arg = args[i++]
    switch (type) {
      case 't': // trusted, no escaping
        return string(arg)
      case 'i': // identifier, escape " mainly
        return ident(arg)
      case 's': // literal, escape to string, int, list, etc.
        return literal(arg)
      default:
        throw new Error()
    }
  })
}

/**
 * Format as string.
 *
 * @param {any} val
 * @return {String}
 * @api public
 */

export function string(val: string) {
  return null == val ? '' : String(val)
}
sqlFormat.string = string
/**
 * Format as identifier.
 *
 * @param {any} val
 * @return {String}
 * @api public
 */

export function ident(val: string) {
  return validIdent(val) ? val : quoteIdent(val)
}
sqlFormat.ident = ident

/**
 * Format as literal.
 *
 * @param {any} val
 * @return {String}
 * @api public
 */

export function literal(val: any): string {
  if (null == val) return 'NULL'
  if (Array.isArray(val)) {
    const vals = val.map(literal)
    return val.length > 0 ? 'ARRAY[' + vals.join(', ') + ']' : literal('{}')
  } else if (typeof val === 'number') {
    return val.toString()
  } else {
    val = val.toString()
  }
  const backslash = ~val.indexOf('\\')
  const prefix = backslash ? 'E' : ''
  val = val.replace(/'/g, "''")
  val = val.replace(/\\/g, '\\\\')
  return prefix + "'" + val + "'"
}
sqlFormat.literal = literal

/**
 * Check if `id` is a valid unquoted identifier.
 *
 * @param {String} id
 * @return {Boolean}
 * @api private
 */

function validIdent(id: string) {
  if (reserved.has(id.toLocaleUpperCase())) return false
  return /^[a-z_][a-z0-9_$]*$/i.test(id)
}

/**
 * Quote identifier.
 *
 * @param {String} id
 * @return {String}
 * @api private
 */

function quoteIdent(id: string) {
  id = id.replace(/"/g, '""')
  return '"' + id + '"'
}

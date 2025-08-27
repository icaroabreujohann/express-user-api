const ERROR_CODES = {
   INTERNAL_ERROR: { code: 1000, key: 'ERR_INTERNAL_ERROR', message: 'Internal server error' },
   MISSING_FIELDS: { code: 1001, key: 'ERR_MISSING_FIELDS', message: 'Missing required fields' },
   USER_EXISTS: { code: 1002, key: 'ERR_USER_EXISTS', message: 'Username or email already exists' },
   INVALID_CREDENTIALS: { code: 1003, key: 'ERR_INVALID_CREDENTIALS', message: 'Invalid username or password' },
   USER_NOT_FOUND: { code: 1004, key: 'ERR_USER_NOT_FOUND', message: 'User not found, check the email or username'}
}
module.exports = ERROR_CODES
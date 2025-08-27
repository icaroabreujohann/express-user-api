const ERROR_CODES = {
   INTERNAL_ERROR: { code: 1000, key: 'ERR_INTERNAL_ERROR', message: 'Internal server error' },
   MISSING_FIELDS: { code: 1001, key: 'ERR_MISSING_FIELDS', message: 'Missing required fields' },
   USER_EXISTS: { code: 1002, key: 'ERR_USER_EXISTS', message: 'Username or email already exists' },
   INVALID_CREDENTIALS: { code: 1003, key: 'ERR_INVALID_CREDENTIALS', message: 'Invalid username or password' },
   USER_NOT_FOUND: { code: 1004, key: 'ERR_USER_NOT_FOUND', message: 'User not found, check the email or username'},
   TOKEN_NOT_PROVIDED: {code: 1004, key: 'ERR_TOKEN_NOT_PROVIDED', message: 'Token not provided, please check'},
   TOKEN_NOT_VALID: {code: 1005, key: 'ERR_TOKEN_NOT_VALID', message: 'Token is not valid or expired'}
}
module.exports = ERROR_CODES
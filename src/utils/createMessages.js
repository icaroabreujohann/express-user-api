function createSuccess(message, data, code, key) {
   return {
      success: true,
      message,
      data,
      code,
      key,
   }
}

function createError(message, data, code, key) {
   const error = new Error(message)
   error.data = data || null
   error.code = code
   error.key = key
   return error
}

module.exports = {createSuccess, createError}
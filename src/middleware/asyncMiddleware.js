/**
 * 
 * @param   fn  this function accept the three parameter
 * It handle the promise and promise error. You Don't need write try Catch block.
 * @returns  it return the asyncHandler function
 */
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

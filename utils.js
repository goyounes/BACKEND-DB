export function reqIPlogger (req,res,next){
    if (req.originalUrl.startsWith('/.well-known')) return next()
    // console.log(`Recived Request from ${req.get('Referer') || req.get('Origin') ||"unknown"}`)
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // console.log(`Request from IP: ${ip} to ${req.originalUrl}`);
    const origin = req.get('Origin')  || req.get('X-Requested-By');
    const referer = req.get('Referer');
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let log = `Request from IP: ${ip} `
    if (origin) log += (`| origin ${origin} `)
    if (referer) log += (`| Referer: ${referer} `)
    log += `| URL: ${req.originalUrl}`
    console.log(log);
    next();
}

export async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  // if (!res.ok) {
  //   const errorMessage = await res.text(); // Extract response body (for detailed messages)
  //   const error = new Error(errorMessage || `Fetch Error ${res.status}: ${res.statusText}`);
  //   error.status = res.status; // Attach the status code to the error
  //   throw error;
  // }
  if (res.ok)  return res.json();
}

export async function fetchJson(url, options = {}) {
 try {
    const res = await fetch(url, options);
    if (!res.ok) {
      // Parse the error body and structure it to throw a custom error
      const {error} = await res.json();

      const error = new Error(errorData.error.message || 'Unknown error occurred');
      error.status = errorData.error.status || res.status; // Use the status from the error response or fallback to the HTTP status
      error.code = errorData.error.code || 'UNKNOWN_ERROR'; // Use the error code or default to 'UNKNOWN_ERROR'
      error.details = errorData.error.details || null; // Include additional details if available

      throw error;  // Throw the error with the structured data
    }

    // If the response was successful (status 2xx), parse and return the JSON
    return await res.json();
  } catch (error) {
    // Catch any error (e.g., network error or HTTP error) and rethrow it
    throw error;
  }

  const res = await fetch(url, options);
  return await res.json();
}

export function throwError(message,statusCode){
  const err = new Error(message)
  if (statusCode) err.status = statusCode
  throw err
}
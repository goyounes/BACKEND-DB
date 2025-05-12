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
  if (!res.ok) {
    const errorMessage = await res.text(); // Extract response body (for detailed messages)
    const error = new Error(errorMessage || `Fetch Error ${res.status}: ${res.statusText}`);
    error.status = res.status; // Attach the status code to the error
    throw error;
  }
  return res.json();
}

export function throwError(message,statusCode){
  const err = new Error(message)
  if (statusCode) err.status = statusCode
  throw err
}
export function reqIPlogger (req,res,next){
    if (req.originalUrl.startsWith('/.well-known')) return next()
    // console.log(`Recived Request from ${req.get('Referer') || req.get('Origin') ||"unknown"}`)
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // console.log(`Request from IP: ${ip} to ${req.originalUrl}`);
    const referer = req.get('Referer') || req.get('Origin') || "unknown";
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`Request from IP: ${ip} | Referer: ${referer} | URL: ${req.originalUrl}`);
    next();
}
import bcrypt from 'bcrypt';

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

export function throwError(message,status,code,details){
  const err = new Error(message)
  if (status) err.status = status
  if (code) err.code = code
  if (details) err.details = details
  throw err
}

export function base64ToBlob(base64, mimeType = '') {
  console.log("Converted the base 64 to blob")
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  console.log(byteArray)
  return new Blob([byteArray], { type: mimeType });
}

export function decodeBinaryToBase64(data){
  if (!data) return null;
  const posterBuffer = Buffer.from(data);
  return posterBuffer.toString('base64');
}

export function getImgDataAndImgStype(poster_img,poster_img_type,MAX_SIZE_BYTES){
  if (!poster_img) {
      poster_img_type = null;
      poster_img = null;
  } else { //movie poster img not null
      const matches = poster_img.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
          const mimeType = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          if (buffer.length > MAX_SIZE_BYTES) throw new Error("Poster image exceeds maximum allowed size of 10MB");

          poster_img_type = mimeType;
          poster_img = buffer;
      } else {
          poster_img_type = null;
          poster_img = null;
      }
  }
  return [poster_img,poster_img_type,]
}



const saltRounds = 10;
export async function hashPassword(plainPassword) {
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

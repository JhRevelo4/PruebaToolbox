/**
 * Decodificación base64url compatible con React Native
 */
const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad) base64 += '===='.slice(0, 4 - pad);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  for (let i = 0; i < base64.length; i += 4) {
    const a = chars.indexOf(base64[i]);
    const b = chars.indexOf(base64[i + 1]);
    const c = chars.indexOf(base64[i + 2]);
    const d = chars.indexOf(base64[i + 3]);
    const n = (a << 18) | (b << 12) | ((Math.max(0, c)) << 6) | Math.max(0, d);
    result += String.fromCharCode((n >> 16) & 255);
    if (c >= 0) result += String.fromCharCode((n >> 8) & 255);
    if (d >= 0) result += String.fromCharCode(n & 255);
  }
  return result;
};

/**
 * Decodifica el payload de un JWT sin verificar firma (solo para leer expireDate en cliente).
 */
export const decodeJwtPayload = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const json = base64UrlDecode(parts[1]);
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

/**
 * Indica si el token JWT está expirado (según campo expireDate en payload).
 */
export const isJwtExpired = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.expireDate) return true;
  const expiry = new Date(payload.expireDate).getTime();
  const now = Date.now();
  return now >= expiry;
};

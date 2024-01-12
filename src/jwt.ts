import jwt from 'jsonwebtoken';

// Función para generar un JWT
function generateJWT(payload:{id:string}, secretKey:string, expiresIn:string) {
    try {
      // Genera el token utilizando el payload, clave secreta y opciones de expiración
      const token = jwt.sign(payload, secretKey, { expiresIn });
      return token;
    } catch (error) {
      console.error('Error al generar el token JWT:', error);
      return null;
    }
  }

// Función para validar y decodificar un token JWT
function validateAndDecodeJWT(token:string, secretKey:string) {
    try {
      // Verifica y decodifica el token utilizando la clave secreta
      const decodedToken = jwt.verify(token, secretKey);
      return decodedToken;
    } catch (error) {
      console.error('Error al validar y decodificar el token JWT:', error);
      return null;
    }
  }

  export {generateJWT,validateAndDecodeJWT}
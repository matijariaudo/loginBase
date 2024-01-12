import bcrypt from 'bcrypt'

// Función para hashear una contraseña
async function hashPassword(password:string) {
  const saltRounds = 10; // Número de rondas de salto (puedes ajustarlo según tus necesidades)
  return await bcrypt.hash(password, saltRounds);
}

// Función para validar una contraseña
async function validatePassword(plainPassword:string, hashedPassword:string) {
  console.log(plainPassword, hashedPassword)
  const compare=await bcrypt.compare(plainPassword, hashedPassword);
  console.log(compare)
  return await compare;
}

export {validatePassword,hashPassword};

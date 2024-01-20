import express, { NextFunction, Request, Response } from 'express';
import UserModel,{IUser} from './userDB';
import { body} from 'express-validator';
import { hashPassword, validatePassword } from './crypt';
import { generateJWT, validateAndDecodeJWT } from './jwt';
import {passport} from './passport'
import * as dotenv from 'dotenv'
import { FreeiA } from './freeOpenIA';


dotenv.config();
const JWTpass=process.env.JWT || '';

const router = express.Router();

// Middleware de validación de datos para el alta de usuario
const validateUserData = [
  body('nombre').notEmpty().isString(),
  body('apellido').notEmpty().isString(),
  body('password').notEmpty().isString().isLength({ min: 6 }).matches(/[!@#$%^&*(),.?":{}|<>]/),
  body('fechaNacimiento').notEmpty().isISO8601(),
  body('telefono').notEmpty().isString(),
  body('email').notEmpty().isEmail(),
];

const middleSession=(req:Request,res:Response,next:NextFunction)=>{
  if (!('user' in req.session)) {
    // Haz algo si el usuario no está autenticado
    console.log(req.session)  
  } 
  next();
  
}

// Ruta para crear un nuevo usuario (Alta)
router.post('/alta', validateUserData, async (req: Request, res: Response) => {
  try {
    const userData = req.body as IUser;
    userData.password=await hashPassword(userData.password);
    const newUser = new UserModel(userData);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario',error});
  }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req: Request, res: Response) => {
  const status= req.body.status||true;
  console.log("buscando todos")
  try {
    const users = await UserModel.find({status});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// Ruta para actualizar un usuario por ID (Modificación)
router.put('/:id', validateUserData, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body as IUser;
    if(updatedUserData.password){updatedUserData.password=await hashPassword(updatedUserData.password);}
    console.log(updatedUserData)
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario',error });
  }
});

router.post('/token',middleSession,async(req:Request,res:Response)=>{
  const {token}:{token:string}=req.body;
  const id:any=await validateAndDecodeJWT(token,JWTpass);
  if(!id){  return res.json({status:false})}
  const user:any=await UserModel.findById(id.id)
  if(!user){  return res.json({status:false})}
  const newToken=await generateJWT({id:user._id},JWTpass,'1h')
  console.log(user)
  return res.json({status:true,user,token:newToken})
  
})

router.post('/session', async (req, res) => {
  const { email , password }:{email:string,password:string}= req.body;
  try {
    // Busca un usuario por su dirección de correo electrónico
    const user = await UserModel.findOne({ email }).select('+password');
    console.log(user)
    if (!user) {return res.status(404).json({ error: 'Usuario no encontrado' });}
    const cont=await validatePassword(password,user.password);
    // Verifica la contraseña (debes implementar la lógica de hash y comparación de contraseñas)
    if (!cont) {return res.status(401).json({ error: 'Contraseña incorrecta' });}
    //genero token
    const token=await generateJWT({"id":user._id},'MATIAS','1h');
    
    // Iniciar sesión con éxito, puedes generar un token JWT aquí si es necesario
    return res.status(200).json({ message: 'Inicio de sesión exitoso', user,token });
    
  } catch (error) {
  
    return res.status(500).json({error});
  
  }
});


// Ruta para eliminar un usuario por ID (Baja)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

router.get('/logingoogle',passport.authenticate("google"));

router.get('/:medio/redirect', (req:Request, res:Response, next) => {
  const medio = req.params.medio;
  const medios = ["facebook","google"];
  if(medios.indexOf(medio)<0){return res.send("No encontrado")}
  passport.authenticate(medio, {failureRedirect: '/login-failed' })(req, res, next);
}, async(req, res) => {
  const {name,email,id,medio}: any = req.user;
  const user=await UserModel.findOne({email});
  let idbase="";
  if(user){
    idbase=user._id;
  }else{
    const newUser=new UserModel({name,email,password:"xxxxxx"})
    await newUser.save();
    idbase=newUser._id;
  }
  const token=await generateJWT({"id":idbase},JWTpass,'1h');
  return res.redirect(`../../?token=${token}`);
});

router.post('/tarot',async(req,res)=>{
  const {cards,question}=req.body;
  const response=await FreeiA("Actua como experto en tarot. Interpreta las cartas["+cards.join(",")+"] enfocada la siguiente pregunta:"+question+".  Estructura la respuesta de la siguiente forma: 3 primeros parrafos el significado de cada carta, 4to parrafo una conclusión.Responde en ingles. Doble salto de linea entre parrafo y parrafo.")
  return res.send({response})
})

export default router;

import mongoose from "mongoose";

const usuarioSchema2 = mongoose.Schema ({
  
},{
});

const UsuarioBanco  = mongoose.model("Banco", usuarioSchema2)
export default UsuarioBanco 
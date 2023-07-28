import mongoose from "mongoose";

const cedulaSchema = mongoose.Schema ({
    cedula: {
        type: Number,
        require: true,
        trim: true
    }
},{
});

const Cedula = mongoose.model("Cedula", cedulaSchema)
export default Cedula
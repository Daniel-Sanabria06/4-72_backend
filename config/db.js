import mongoose from "mongoose";

const contectarDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI , {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('Conexión exitosa a MongoDB');
              })
             /* .catch((error) => {
                console.error('Error en la conexión a MongoDB:', error);
              });
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB conectado en ${url}`)
        */
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default contectarDB
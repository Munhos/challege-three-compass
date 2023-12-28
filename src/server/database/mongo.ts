import mongoose from "mongoose";

export const conectionData = async ()=>{
    await mongoose.connect(`mongodb+srv://JulioCesar:${process.env.KEYDATABASE}@nigeriascolarshipdataba.a5exid6.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
            console.log("Banco de dados conectado!");
        }
    ).catch((error) => {
            console.log(`Erro: ${error}`);
            
        }
    );
}
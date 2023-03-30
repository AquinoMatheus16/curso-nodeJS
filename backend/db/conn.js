const mongoose = require("mongoose")

async function main(){
    try {
        mongoose.set("strictQuery", true)

        await mongoose.connect(
            "mongodb+srv://matheusaquino1618:tCNHViUdct7xlsPG@cluster0.7yjno45.mongodb.net/?retryWrites=true&w=majority"
        )
        console.log("Conectado ao banco!");

    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

module.exports = main

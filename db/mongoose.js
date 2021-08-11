const mongoPath = process.env.mongoPath
const mongoose = require('mongoose')

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
        }

        mongoose.connect(mongoPath, dbOptions)
        mongoose.set('useFindAndModify', false)
        mongoose.Promise = global.Promise

        mongoose.connection.on('disconnected', () => {
            console.log('Bot has disconnected from database!')
        })

        mongoose.connection.on('connected', () => {
            console.log('Connected to mongo DB!')
        })

        mongoose.connection.on('err', (err) => {
            console.log('There was an error connecting to the DB!' + err)
        })
    }
}
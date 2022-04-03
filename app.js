const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        var mongoDB = config.get('mongoUri2');
        mongoose.connect(mongoDB);
        mongoose.Promise = global.Promise;
        var db = mongoose.connection;

        app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()



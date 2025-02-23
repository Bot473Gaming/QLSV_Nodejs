const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://tungnguyenduong473:SYiGaEaDylHdXlEK@cluster0.2xl7z.mongodb.net//qlsv_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successfully!');

    } catch (e) {
        console.log(e, 'connect fail')
    }
}

module.exports = { connect }
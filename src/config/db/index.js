const mongoose = require('mongoose');
const user = "tungnguyenduong473"
const password = "SYiGaEaDylHdXlEK"

const uri = `mongodb+srv://tungnguyenduong473:${password}@cluster0.2xl7z.mongodb.net/qlsv_dev`
async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successfully!');

    } catch (e) {
        console.log(e, 'connect fail')
    }
}

module.exports = { connect }
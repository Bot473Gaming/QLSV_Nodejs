const Student = require('../models/Student');
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    // Get [/]
    index(req, res, next) {
        Student.find({})
            .then(students => {
                res.render('home', {
                    students: mutipleMongooseToObject(students)
                })
            })
            .catch(next)

    }
    create(req, res, next) {
        const formData = req.body;
        const student = new Student(formData);
        student.save()
            .then(() => res.redirect('/'))
            .catch((e) => {
                console.log(e);
            })
    }
    update(req, res, next) {
        let id = req.body._id;
        let student = req.body;
        delete student._id;
        // res.json(student)
        Student.updateOne({ _id: id }, student)
            .then(() => res.redirect('/'))
            .catch(next)
    }

    delete(req, res, next) {
        Student.deleteOne({ _id: req.body._id })
            .then(() => res.redirect('/'))
            .catch(next)
    }
    handelAction(req, res, next) {
        var stId = req.body.studentIds.split(',');
        Student.deleteMany({ _id: { $in: stId } })
            .then(() => res.redirect('/'))
            .catch(next)
    }
}

module.exports = new SiteController();
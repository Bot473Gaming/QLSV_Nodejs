const Student = require("../models/Student");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
    // Get [/]
    index(req, res, next) {
        Student.find({})
            .then((students) => {
                res.render("home", {
                    students: mutipleMongooseToObject(students),
                });
            })
            .catch(next);
    }
    create(req, res, next) {
        const formData = req.body;
        formData.birthdate = req.body.birthdate.split("-").reverse().join("/");
        const student = new Student(formData);
        // res.json(student);
        student
            .save()
            .then(() => res.redirect("/"))
            .catch((e) => {
                console.log(e);
            });
    }
    update(req, res, next) {
        let id = req.body._id;
        let student = req.body;
        delete student._id;
        student.birthdate = req.body.birthdate.split("-").reverse().join("/");
        // res.json(student)
        Student.updateOne({ _id: id }, student)
            .then(() => res.redirect("/"))
            .catch(next);
    }

    handelAction(req, res, next) {
        var stId = req.body.studentIds.split(",");
        // console.log(req.body)
        Student.deleteMany({ _id: { $in: stId } })
            .then(() => res.redirect("/"))
            .catch(next);
    }
    //API
    getStudent(req, res, next) {
        const { studentCode } = req.query;

        if (studentCode) {
            // Tìm một sinh viên theo studentCode
            Student.findOne({ studentCode: studentCode })
                .then((student) => {
                    if (!student) {
                        return res
                            .status(404)
                            .json({ message: "Student not found" });
                    }
                    res.json(student);
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Server error",
                        error: err.message,
                    });
                });
        } else {
            // Lấy tất cả sinh viên
            Student.find({})
                .then((students) => {
                    res.json(mutipleMongooseToObject(students));
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Server error",
                        error: err.message,
                    });
                });
        }
    }
}

module.exports = new SiteController();

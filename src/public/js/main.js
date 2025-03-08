function editBtn(id) {
    const dataStudents = document.querySelector("tbody").children;
    var inputForm = document.querySelectorAll(".edit-form");
    var student = Array.from(dataStudents).find(
        (student) => student.querySelector(".nb").textContent == id,
    );
    let _id = student.querySelector("input[type=checkbox]").value;
    addId(_id);
    student = student.querySelectorAll(".dt");
    Array.from(student).forEach((val, index) => {
        if (index === 3) {
            inputForm[index].value = val.textContent
                .split("/")
                .reverse()
                .join("-");
        } else {
            inputForm[index].value = val.textContent;
        }
    });
}

function addId(__id) {
    var inpId = document.querySelectorAll(".st-id");
    Array.from(inpId).forEach((inp) => (inp.value = __id));
}
var checkboxs = document.querySelectorAll(".form-check-input");
var allCheckBox = document.querySelector(".all-check-input");
var btnApply = document.querySelector(".btn-apply");
var formApply = document.querySelector(".form-apply");
var selectAction = document.querySelector(".action-select");
try {
    allCheckBox.onclick = () => {
        var isCheckAll = allCheckBox.checked;
        Array.from(checkboxs).forEach((checkbox) => {
            checkbox.checked = isCheckAll;
        });
        var someCheck = Array.from(checkboxs).some(
            (checkbox) => checkbox.checked,
        );
        if (someCheck && selectAction.value != "null") {
            if (btnApply.classList.contains("disabled")) {
                btnApply.classList.remove("disabled");
            }
        } else {
            if (!btnApply.classList.contains("disabled")) {
                btnApply.classList.add("disabled");
            }
        }
    };
    Array.from(checkboxs).forEach(
        (checkbox) =>
            (checkbox.onchange = () => {
                var isCheckAll = Array.from(checkboxs).every(
                    (checkbox) => checkbox.checked,
                );
                var someCheck = Array.from(checkboxs).some(
                    (checkbox) => checkbox.checked,
                );
                allCheckBox.checked = isCheckAll;
                if (someCheck && selectAction.value != "null") {
                    if (btnApply.classList.contains("disabled")) {
                        btnApply.classList.remove("disabled");
                    }
                } else {
                    if (!btnApply.classList.contains("disabled")) {
                        btnApply.classList.add("disabled");
                    }
                }
            }),
    );
    selectAction.onchange = () => {
        var someCheck = Array.from(checkboxs).some(
            (checkbox) => checkbox.checked,
        );
        // formApply.action = `/handle?_method=${selectAction.value}`;
        if (someCheck && selectAction.value != "null") {
            if (btnApply.classList.contains("disabled")) {
                btnApply.classList.remove("disabled");
            }
        } else {
            if (!btnApply.classList.contains("disabled")) {
                btnApply.classList.add("disabled");
            }
        }
    };
    btnApply.onclick = (e) => {
        var studentIds = document.querySelector("input[name=studentIds]");
        const dataStudents = document.querySelectorAll(
            "input[name='studentId[]']:checked",
        );
        var st = Array.from(dataStudents)
            .map((val) => val.value)
            .join(",");
        // console.log(st)
        // console.log(studentIds)
        studentIds.value = st;
        // formApply.submit();
    };
} catch (e) {}
Array.prototype.remove = function () {
    var what,
        a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
var Models = document.querySelectorAll("[notSame]");
Array.from(Models).forEach((Model) => {
    var temp = Model.getAttribute("notSame").split(":");
    console.log(temp);
    var target = temp.shift();
    var val = temp.shift();
    var btnOpens = document.querySelectorAll(`[notSameTarget="${target}"]`);
    Array.from(btnOpens).forEach((btnOpen) => {
        btnOpen.addEventListener("click", function () {
                
            $.get("/api/students", (data) => {
                var canSubmit = true;
                store = data.map((val) => val.studentCode.toLowerCase());
                var form = Model;
                var inpCode = form.querySelector(`input[name=${val}]`);
                var message_err = form.querySelector(".invalid-feedback");
                // console.log(inpCode.value, store);
                if (
                    store.includes(inpCode.value.toLocaleLowerCase()) &&
                    canSubmit
                ) {
                    store.remove(inpCode.value.toLocaleLowerCase());
                }
                inpCode.onchange = function () {
                    // console.log(inpCode.value, "ok");
                    this.value = this.value.trim();
                    if (store.includes(this.value.toLocaleLowerCase())) {
                        message_err.style.display = "block";
                        canSubmit = false;
                    } else {
                        message_err.style.display = "none";
                        canSubmit = true;
                    }
                };
                form.onsubmit = function (e) {
                    if (!canSubmit) {
                        inpCode.focus();
                        e.preventDefault();
                    }
                };
            });
        });
    });
});

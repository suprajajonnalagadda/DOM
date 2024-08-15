document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let studentName = document.getElementById('student-name').value;
    let studentId = document.getElementById('student-id').value;
    let emailId = document.getElementById('email-id').value;
    let contactNo = document.getElementById('contact-no').value;

    if (studentName === "" || studentId === "" || emailId === "" || contactNo === "") {
        alert("Please fill all the fields.");
        return;
    }

    if (!isValidEmail(emailId)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (isDuplicateId(studentId)) {
        alert("A student with this ID already exists.");
        return;
    }

    let studentData = {
        name: studentName,
        id: studentId,
        email: emailId,
        contact: contactNo
    };

    addStudentToTable(studentData);
    saveToLocalStorage(studentData);

    document.getElementById('student-form').reset();
});

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function isDuplicateId(studentId) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    return students.some(student => student.id === studentId);
}

function addStudentToTable(studentData) {
    let table = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);

    cell1.innerHTML = studentData.name;
    cell2.innerHTML = studentData.id;
    cell3.innerHTML = studentData.email;
    cell4.innerHTML = studentData.contact;
    cell5.innerHTML = `<button onclick="editStudent(this)">Edit</button> <button onclick="deleteStudent(this)">Delete</button>`;
}

function saveToLocalStorage(studentData) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.push(studentData);
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudentsFromLocalStorage() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.forEach(function(student) {
        addStudentToTable(student);
    });
}

function editStudent(button) {
    let row = button.parentElement.parentElement;
    let studentId = row.cells[1].innerText;

    let students = JSON.parse(localStorage.getItem('students'));
    let student = students.find(s => s.id === studentId);

    document.getElementById('student-name').value = student.name;
    document.getElementById('student-id').value = student.id;
    document.getElementById('email-id').value = student.email;
    document.getElementById('contact-no').value = student.contact;

    document.getElementById('student-form').onsubmit = function(e) {
        e.preventDefault();

        student.name = document.getElementById('student-name').value;
        student.id = document.getElementById('student-id').value;
        student.email = document.getElementById('email-id').value;
        student.contact = document.getElementById('contact-no').value;

        localStorage.setItem('students', JSON.stringify(students));
        loadStudentsFromLocalStorage();
        document.getElementById('student-form').reset();
    };
}

function deleteStudent(button) {
    let row = button.parentElement.parentElement;
    let studentId = row.cells[1].innerText;

    let students = JSON.parse(localStorage.getItem('students'));
    students = students.filter(s => s.id !== studentId);
    localStorage.setItem('students', JSON.stringify(students));

    row.remove();
}

window.onload = function() {
    loadStudentsFromLocalStorage();
};

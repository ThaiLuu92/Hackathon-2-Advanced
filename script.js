// Gọi render
// B1: lấy thông tin từ local
const students = JSON.parse(localStorage.getItem("students")) || [];
const form = document.getElementById("inp-form");

renderStudent(students);

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Hàm chặn action của form
  // b1 : lấy thông tin từ local , trả về mảng
  const students = JSON.parse(localStorage.getItem("students")) || [];
  //   b2: lấy thông tin từ input
  const form = document.getElementById("inp-form");
  const studentNameElement = document.getElementById("inp-name");
  const studentEmailElement = document.getElementById("inp-email");
  const studentPhoneElement = document.getElementById("inp-phone");
  const studentAddressElement = document.getElementById("inp-address");
  const studentGenderElement = document.getElementById("inp-gender");

  const studentName = studentNameElement.value;
  const studentEmail = studentEmailElement.value;
  const studentPhone = studentPhoneElement.value;
  const studentAddress = studentAddressElement.value;
  const studentGender = studentGenderElement;

  //   Xoa input
  studentNameElement.value = "";
  studentEmailElement.value = "";
  studentPhoneElement.value = "";
  studentPhoneElement.value = "";

  //   b3: lưu thông tin vào mảng
  const student = {
    name: studentName,
    email: studentEmail,
    phone: studentPhone,
    adress: studentAddress,
    gender: true,
  };

  function isValidEmail(email) {
    const studentEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return studentEmail.test(email);
  }
  
  
  function isValidPhoneNumber(phoneNumber) {
    const studentPhone = /(09|03|07|08|05)+([0-9]{8})\b/;
    return studentPhone.test(phoneNumber);
  }

  if (studentName === "") {
    alert("Họ và tên không được để trống");
    return;
  }

  if (!isValidEmail(studentEmail)) {
    alert("Email không đúng định dạng");
    return;
  }

  if (!isValidPhoneNumber(studentPhone)) {
    alert("Số điện thoại không đúng định dạng");
    return;
  }

  if (studentAddress === "") {
    alert("Quê quán không được để trống");
    return;
  }

  students.push(student);
  //   b4: lưu thông tin vào localstore
  localStorage.setItem("students", JSON.stringify(students));

  
  renderStudent(students);
});
//   Check formValidation Name


// Hàm hiển thị
function renderStudent(data) {
  // B1: lấy thông tin từ local
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // B2: truy vấn
  const listStudentElement = document.querySelector("#list-student");

  // B3: tạo nội dung của bảng
  let listStudentContent = `
      <tr>
          <th>#</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Điện thoại</th>
          <th>Địa chỉ</th>
          <th>Gender</th>
          <th>Hành động</th>
          <th><button onclick="handleArrange()">Sắp xếp</button></th>
      </tr>
    `;

  students.forEach((student, index) => {
    listStudentContent += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.adress}</td>
            <td>${student.gender}</td>
            <td><button class="edit-btn" onclick="btn_edit(${index})">edit</button><button class="delete-btn" onclick="btn_del(${index})">delete</button></td>
            <td></td>
        </tr>
      `;
  });

  listStudentElement.innerHTML = listStudentContent;

  // B4: lưu thông tin vào localStorage
  localStorage.setItem("students", JSON.stringify(students));
}


// Hàm xóa
function btn_del(index) {
  //  B1: Lấy dữ liệu từ local
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // B2: Xóa
  students.splice(index, 1);

  // B3: Đưa lên local
  localStorage.setItem("students", JSON.stringify(students));

  // B4: render
  renderStudent();
}


// Hàm tìm tên

function handleSearch(valueSearch) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const dataFilter = [];

    students.forEach((student) => {
      if (student.name.toLowerCase().includes(valueSearch.toLowerCase())) {
        dataFilter.push(student);
      }
    });
    
    renderStudent(dataFilter);
  }


// Sắp xếp theo thứ tự AB

function handleArrange() {
    students.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
  
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    localStorage.setItem("students", JSON.stringify(students));
  
    console.log(students);
    renderStudent(students);
  }

var errortimeout = 0;
async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  try {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await axios.post("/api/authentication/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data[0].id != "invalid") {
      location.replace("../dashboardpage");
    } else {
      alert("Invalid");
    }
  } catch (error) {
    alert("Error Occured");
  }
}

async function register() {
  let username = document.getElementById("regusername").value;
  let password = document.getElementById("regpassword").value;
  let lastname = document.getElementById("reglastname").value;
  let firstname = document.getElementById("regfirstname").value;
  try {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("lastname", lastname);
    formData.append("firstname", firstname);

    const response = await axios.post("/api/register/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data[0].id != "invalid") {
      alert("Successfully Registered");
    } else {
      alert("Invalid");
    }
  } catch (error) {
    alert("Error Occured");
  }
}

async function checkuser() {
  try {
    let response = await fetch("/api/authentication/checkuser", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id == "loggedin") {
      location.replace("../dashboardpage");
    }
    errortimeout = 0;
  } catch (error) {
    errortimeout += 1;
    if (errortimeout >= 5) {
      alert("Opps Network Error!");
    } else {
      setTimeout(checkuser, 1000);
    }
  }
}

checkuser();

async function readlogin() {
  document.getElementById("usernamevar").value =
    document.getElementById("username").value;
  document.getElementById("passwordvar").value =
    document.getElementById("password").value;
}

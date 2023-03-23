var errortimeout = 0;

////////////// for socket connection /////////////////
const socket = io();

socket.on("connect", () => {
  dashboard();
});

socket.on("chat-message", (msg) => {
  console.log(msg);
});

socket.on("clientmessagerecieve", (msg) => {
  console.log(msg.message);
});

function sendrealtime() {
  socket.emit("message", {
    message: "this is from client socket",
  });
}
//////////////////////////////////////////////////////

async function dashboard() {
  try {
    let response = await fetch("/api/user1/user1/dashboard/dashboard", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id == "invalid") {
      location.replace("../loginpage");
    } else {
      let name = document.getElementById("titleid").innerHTML;
      let output = eval("`" + name.toString() + "`");
      document.getElementById("titleid").innerHTML = output;
    }
    errortimeout = 0;
  } catch (error) {
    errortimeout += 1;
    if (errortimeout >= 5) {
      alert("Opps Network Error!");
    } else {
      setTimeout(dashboard, 1000);
    }
  }
}

async function uploadfile() {
  var fileid = document.getElementById("file1");
  try {
    let formData = new FormData();
    formData.append("file1", fileid.files[0]);
    const response = await axios.post(
      "/api/user1/user1/dashboard/fileupload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data[0].id == "invalid") {
      alert("Invalid");
    } else {
      alert("File Upload Success");
    }
  } catch (error) {
    alert("Error Occured");
  }
}

async function sendmessage() {
  let dropdownid = document.getElementById("dropdownid").value;
  let useridnum = document.getElementById("useridnum").value;
  let usermsgid = document.getElementById("usermsgid").value;
  try {
    let formData = new FormData();
    formData.append("scheduleid", dropdownid);
    formData.append("useridnum", useridnum);
    formData.append("usermsgid", usermsgid);
    const response = await axios.post(
      "/api/user1/user1/message/sendmessage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data[0].id == "success") {
      alert("Success");
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
    if (myresult[0].id != "loggedin") {
      location.replace("../loginpage");
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

function logout() {
  fetch("/api/authentication/logout", {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  location.replace("../loginpage");
}

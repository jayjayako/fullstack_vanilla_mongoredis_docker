///// i changed something /////
var publicvapidkey =
  "BJplVShk3kb27bTP3x5t4n0vnXanOmQpayLPqQdLIXQ_YqI0PgvGOUw3aj1uQtAezqU3lobfEPXXZvtBwMTPMGc";

let swvarregister;

if ("serviceWorker" in navigator) {
  registernow().catch((err) => console.error(err));
}

//////////////// registered service worker //////////////
async function registernow() {
  console.log("Registering service worker... ");
  swvarregister = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });
  console.log(swvarregister);
  console.log("Service Worker Registered...");
}
/////////////////////////////////////////////////////////

//////////////// register push user /////////////////////
async function registername() {
  console.log("Registering Push...");
  const subscription = await swvarregister.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicvapidkey),
  });

  let strsubscription = JSON.stringify(subscription);

  try {
    let formData = new FormData();
    formData.append("strsubscription", strsubscription);
    let response = await fetch("/api/user1/user1/notification/subscribe", {
      method: "POST",
      body: formData,
    });
    let myresult = await response.json();
    if (myresult[0].data == "success") {
      alert("User Successfully registered");
    }
    console.log("Push Registered...");
  } catch (error) {
    console.log("Error on registration");
  }
}
////////////////////////////////////////////////////////

/////////////////// uint array function ////////////////
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
////////////////////////////////////////////////////////

// /////////////////// send notif /////////////////////////
// async function sendnotif() {
//   let username = document.getElementById("username").value;
//   let message = document.getElementById("message").value;
//   try {
//     let formData = new FormData();
//     formData.append("username", username);
//     formData.append("message", message);
//     let response = await fetch("/pushnotifsend", {
//       method: "POST",
//       body: formData,
//     });
//     let myresult = await response.json();
//     if (myresult[0].data == "success") {
//       alert("User Successfully sent notif");
//     }
//     console.log("Notif Sent...");
//   } catch (error) {
//     console.log("Error on Notif send");
//   }
// }
// ////////////////////////////////////////////////////////

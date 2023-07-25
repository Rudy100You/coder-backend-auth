$(document).ready(function () {

  $("#logInForm").submit((event) => {
    event.preventDefault();
    var formData = formToObject("#logInForm");
    fetch("/api/session/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const resBody = await res.json();
      if (res.status !== 200) {
        $("#loginErrorMessage").text(resBody.message);
      }
      else{
        window.location.replace("/profile")
      }
    });
  });
});

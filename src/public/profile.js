$(document).ready(() => {
    $("#logOutButton").click(()=>{
        window.location.replace("/api/session/logout")
    });
})
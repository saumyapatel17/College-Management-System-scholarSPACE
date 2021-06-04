$("body").on('click', '.toggle-password', function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $("#password");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});
$("body").on('click', '.toggle-confirmPassword', function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $("#confirmPassword");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});
function checkPasswordMatch() {
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  if (password != confirmPassword)
    $("#CheckPasswordMatch").html("Passwords does not match!");
  else
    $("#CheckPasswordMatch").html("Passwords match.");
}
$(document).ready(function () {
  $("#confirmPassword").keyup(checkPasswordMatch);
});
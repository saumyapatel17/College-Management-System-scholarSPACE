$(function () {
  $("#form-total").steps({
    headerTag: "h2",
    bodyTag: "section",
    transitionEffect: "fade",
    enableAllSteps: true,
    stepsOrientation: "vertical",
    autoFocus: true,
    transitionEffectSpeed: 500,
    titleTemplate: '<div class="title">#title#</div>',
    labels: {
      /* previous : 'Back Step', */
      // next: '<i class="zmdi zmdi-arrow-right ></i>',
      // finish: '<i class="zmdi zmdi-check" ></i>',
      current: ''
    },
  })
});
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
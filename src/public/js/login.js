$(document).ready(function () {
  console.log("login.js muvaffaqiyatli yuklandi!");

  // Event Delegation (Element keyinroq yuklansa ham ishlaydi)
  $(document).on("click", "#togglePassword", function (e) {
    e.preventDefault();

    const $passwordInput = $("#memberPassword");
    const currentType = $passwordInput.attr("type");

    if (currentType === "password") {
      $passwordInput.attr("type", "text");
      // Ikonkani o'zgartiramiz
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      $passwordInput.attr("type", "password");
      // Asl holiga qaytaramiz
      $(this).removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });

  // Forgot password tugmasi
  $(document).on("click", ".forgot-pass a", function (e) {
    e.preventDefault();
    alert("Parolni tiklash uchun admin bilan bog'laning!");
  });
});

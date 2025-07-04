document.getElementById("enquiry-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  // Collect input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all required fields.");
    return;
  }

  const data = new URLSearchParams();

  // Required fixed values
  data.append("DataFrom", "T");
  data.append("ApiKey", "a28cc43c-526d-4010-970e-0d0e92c18902");
  data.append("EnquiryDate", new Date().toISOString().split("T")[0]);

  // Dynamic user input
  data.append("FirstName", name);
  data.append("Email", email);
  data.append("MobileNo", phone);

  // Required source info
  data.append("Source", "Digitals");
  data.append("SourceDetail", "WebSite");

  // Optional placeholder values
  data.append("Remark", "Submitted via landing page");

  fetch("https://nirman.maksoftbox.com/MDocBoxAPI/MdocAddEnquiryORTeleCalling", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString()
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.code === 200) {
        alert("✅ Enquiry submitted successfully!");
        form.reset();
      } else {
        alert("❌ Submission failed: " + result.message);
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      alert("❌ Network error. Please try again later.");
    });
});
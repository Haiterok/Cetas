// NEWSLETTER

const newsletterBtn = document.getElementById("newsletterBtn");
const newsletterReceiverEmail = document.getElementById(
  "newsletterReceiverEmail"
);
const newsletterReceiverName = document.getElementById(
  "newsletterReceiverName"
);

newsletterBtn.addEventListener("click", async () => {
  const receiverEmail = newsletterReceiverEmail.value;
  const receiverName = newsletterReceiverName.value;

  await fetch("http://localhost:4000/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ receiverEmail, receiverName }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      newsletterBtn.innerText = "Subscribed!";
      newsletterBtn.disabled = true;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Subscription failed. Please try again.");
    });
});

// CONTACTS

const contactsBtn = document.getElementById("contactsBtn");
const contactsReceiverPhone = document.getElementById("contactsReceiverPhone");
const contactsReceiverName = document.getElementById("contactsReceiverName");
const contactsReceiverEmail = document.getElementById("contactsReceiverEmail");
const hiddenElement = document.getElementById("hiddenElement");

contactsBtn.addEventListener("click", async () => {
  const receiverEmail = contactsReceiverEmail.value;
  const receiverName = contactsReceiverName.value;
  const receiverPhone = contactsReceiverPhone.value;

  if (!receiverEmail || !receiverName || !receiverPhone) {
    alert("Please fill in all fields.");
    return;
  }

  await fetch("http://localhost:4000/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ receiverEmail, receiverName, receiverPhone }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      hiddenElement.innerText = "true";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Form sending was failed. Please try again.");
      hiddenElement.innerText = "false";
    });
});

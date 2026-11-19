const { invitations, formEndpoint } = window.easyInvites;
const filters = document.querySelector("#filters");
const cards = document.querySelector("#cards");
const results = document.querySelector("#results");

function render(category) {
  const visible = invitations.filter(invite => category === "All" || invite.occasion === category);
  cards.replaceChildren();
  for (const invite of visible) {
    const card = document.createElement("article");
    card.className = "card";
    const image = document.createElement("img");
    image.src = "./assets/" + encodeURIComponent(invite.folder) + ".jpg";
    image.alt = "";
    image.loading = "lazy";
    const details = document.createElement("div");
    const label = document.createElement("p");
    label.className = "label";
    label.textContent = invite.language + " · " + invite.occasion;
    const title = document.createElement("h3");
    title.textContent = invite.title;
    const link = document.createElement("a");
    link.href = /^https:\/\//i.test(invite.url) ? invite.url : "./demos/" + encodeURIComponent(invite.folder) + "/";
    link.textContent = "View invitation ↗";
    link.setAttribute("aria-label", "View " + invite.title + " invitation");
    details.append(label, title, link);
    card.append(image, details);
    cards.append(card);
  }
  results.textContent = visible.length + " invitations shown.";
}

if (filters) {
for (const category of ["All", ...new Set(invitations.map(invite => invite.occasion))]) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = category;
  button.setAttribute("aria-pressed", String(category === "All"));
  button.addEventListener("click", () => {
    for (const filter of filters.children) filter.setAttribute("aria-pressed", String(filter === button));
    render(category);
  });
  filters.append(button);
}
render("All");
}

const form = document.querySelector("#enquiry");
if (form && /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(formEndpoint)) {
  const button = form.querySelector("button");
  const status = document.querySelector("#status");
  button.disabled = false;
  status.textContent = "";
  form.addEventListener("submit", async event => {
    event.preventDefault();
    button.disabled = true;
    status.textContent = "Sending…";
    try {
      const response = await fetch(formEndpoint, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      status.textContent = "Thank you. Your enquiry has been sent.";
    } catch {
      status.textContent = "Your enquiry could not be sent. Please try again or use the email link.";
    } finally {
      button.disabled = false;
    }
  });
}

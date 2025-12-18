const form = document.getElementById("feedbackForm");
const commentBox = document.getElementById("commentBox");

let comments = JSON.parse(localStorage.getItem("comments")) || [];

displayComments();

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const newComment = {
        name: name,
        message: message
    };

    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));

    displayComments();

    // Send feedback to your email
    window.location.href = `mailto:vickysadavarte996@gmail.com?subject=Food Stall Feedback&body=Name: ${name}%0AFeedback: ${message}`;

    form.reset();
});

function displayComments() {
    commentBox.innerHTML = "";
    comments.forEach(comment => {
        const div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = `<strong>${comment.name}</strong><br>${comment.message}`;
        commentBox.appendChild(div);
    });
}

const ratingSpans = document.querySelectorAll("#rating span");
const ratingDisplay = document.getElementById("ratingValueDisplay");

let ratingValue = localStorage.getItem("rating") || 0;

// Update display
function updateRatingDisplay() {
    if(ratingValue > 0){
        const emoji = ratingSpans[ratingValue-1].textContent;
        ratingDisplay.textContent = emoji + " (" + ratingValue + ")";
    } else {
        ratingDisplay.textContent = "None";
    }
}

// Emoji rating click
ratingSpans.forEach(s => {
    s.addEventListener("click", () => {
        ratingValue = s.dataset.value;
        localStorage.setItem("rating", ratingValue);
        ratingSpans.forEach(sp => sp.classList.remove("selected"));
        s.classList.add("selected");
        alert("Thanks for rating! 🌟");
        updateRatingDisplay();
    });
});

// Apply previous rating if exists
if(ratingValue > 0) ratingSpans[ratingValue-1].classList.add("selected");
updateRatingDisplay();

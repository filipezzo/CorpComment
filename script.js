const BASE_API = "https://bytegrad.com/course-assets/js/1/api";
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const listEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinner = document.querySelector(".spinner");
const upvote = document.querySelector(".upvote");

const renderFeedbackItem = (feedbackItem) => {
  const feedbackItemHTML = `
  <li class="feedback">
  <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${feedbackItem.upvoteCount}</span>
  </button>
  <section class="feedback__badge">
      <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
  </section>
  <div class="feedback__content">
      <p class="feedback__company">${feedbackItem.company}</p>
      <p class="feedback__text">${feedbackItem.text}</p>
  </div>
  <p class="feedback__date">${
    feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`
  }</p>
</li>
`;

  listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
};

const showVisualIndicator = (textValid) => {
  const className = textValid === "valid" ? "form--valid" : "form--invalid";
  formEl.classList.add(className);
  setTimeout(() => formEl.classList.remove(className), 2000);
};

const handleInput = () => {
  const maxCh = 150;
  const nTyped = textareaEl.value.length;
  const valueCh = maxCh - nTyped;
  counterEl.textContent = valueCh;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const text = textareaEl.value;

  if (text.includes("#") && text.length >= 5) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    textareaEl.focus();
    return;
  }

  const hashtag = text.split(" ").find((e) => e.includes("#"));
  const company = hashtag.replace("#", "");
  const badgeLetter = company[0].toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;
  const feedbackObject = { daysAgo, upvoteCount, badgeLetter, text, company };

  renderFeedbackItem(feedbackObject);

  fetch(`${BASE_API}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackObject),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("something went wrong");
        return;
      }

      console.log("successfuly submitted");
    })
    .catch((erro) => console.log(erro));

  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = 150;
};

const handleListClick = (e) => {
  const clickedEl = e.target;
  const upvoteIntention = clickedEl.className.includes("upvote");

  if (upvoteIntention) {
    const upvoteBtnEl = clickedEl.closest(".upvote");
    upvoteBtnEl.disabled = true;
    const upvoteCountEl = upvoteBtnEl.querySelector(".upvote__count");
    let count = +upvoteCountEl.textContent;

    count++;
    upvoteCountEl.textContent = count;
  } else {
    clickedEl.closest(".feedback").classList.toggle("feedback--expand");
  }
};

textareaEl.addEventListener("input", handleInput);
formEl.addEventListener("submit", handleSubmit);
listEl.addEventListener("click", handleListClick);

fetch(`${BASE_API}/feedbacks`)
  .then((res) => res.json())
  .then((data) => {
    spinner.remove();
    data.feedbacks.forEach((d) => {
      renderFeedbackItem(d);
    });
  })
  .catch((error) => {
    listEl.textContent = `Sorry something went wrong :(  ${error}`;
  });

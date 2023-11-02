const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const listEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");

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
  const companyName = hashtag.replace("#", "");
  const companyFirstLetter = companyName[0].toUpperCase();
  const upVoteCount = 0;
  const daysAgo = 0;

  const feedbackItemHTML = `
    <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upVoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${companyFirstLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${companyName}</p>
        <p class="feedback__text">${text}</p>
    </div>
    <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
  </li>
  `;

  listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);

  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = 150;
};

textareaEl.addEventListener("input", handleInput);
formEl.addEventListener("submit", handleSubmit);

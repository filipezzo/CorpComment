const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const listEl = document.querySelector(".feedbacks");

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
    formEl.classList.add("form--valid");
    setTimeout(() => formEl.classList.remove("form--valid"), 2000);
  } else {
    formEl.classList.add("form--invalid");
    setTimeout(() => {
      formEl.classList.remove("form--invalid");
    }, 2000);

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
    <p class="feedback__date">${daysAgo === 0 ? "New" : daysAgo + "d"}</p>
  </li>
  `;

  listEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
};

textareaEl.addEventListener("input", handleInput);
formEl.addEventListener("submit", handleSubmit);

const billElement = document.querySelector(".bill__input");
const peopleNumberElement = document.querySelector(".people__number__input");
const customBtn = document.querySelector(".custom");
const tipScreen = document.querySelector(".tip__amount__value");
const totalScreen = document.querySelector(".total__value");
const resetBtn = document.querySelector(".reset__button");
const errorMessage = document.querySelector(".people__number__error");

const tipAmountCalculate = (bill, tip, num) => {
  let tipAmount = (bill * (tip / 100)) / num;
  let totlaAmount = (tipAmount * num + bill) / num;

  tipScreen.innerText = `$${tipAmount.toFixed(2)}`;
  totalScreen.innerText = `$${totlaAmount.toFixed(2)}`;
};

const tipButtons = document.querySelectorAll(".select");
tipButtons.forEach((item) => {
  item.addEventListener("click", (button) => {
    if (billElement.value === "") return;
    else if (peopleNumberElement.value === "") {
      peopleNumberElement.value = 1;
    } else if (peopleNumberElement.value == 0) {
      errorMessage.classList.add("people__number__errorActive");
      peopleNumberElement.classList.add("people__number__input__error");
      return;
    }
    const active = document.querySelector(".select__when__clicked");
    if (active) active.classList.remove("select__when__clicked");
    item.classList.add("select__when__clicked");
    errorMessage.classList.remove("people__number__errorActive");
    peopleNumberElement.classList.remove("people__number__input__error");
    customBtn.value = "";

    let tipValue = button.target.innerText;
    tipAmountCalculate(
      parseFloat(billElement.value),
      parseInt(tipValue),
      parseInt(peopleNumberElement.value)
    );
  });
});

const resetFunction = () => {
  tipScreen.innerText = "$0.00";
  totalScreen.innerText = "$0.00";
  billElement.value = "";
  peopleNumberElement.value = "";
  customBtn.value = "";
  errorMessage.classList.remove("people__number__errorActive");
  peopleNumberElement.classList.remove("people__number__input__error");
  const active = document.querySelector(".select__when__clicked");
  active.classList.remove("select__when__clicked");
};

resetBtn.addEventListener("click", (event) => resetFunction());

customBtn.addEventListener("blur", (key) => {
  if (peopleNumberElement.value === "") {
    peopleNumberElement.value = 1;
  } else if (peopleNumberElement.value == 0) {
    errorMessage.classList.add("people__number__errorActive");
    peopleNumberElement.classList.add("people__number__input__error");
    return;
  }
  errorMessage.classList.remove("people__number__errorActive");
  peopleNumberElement.classList.remove("people__number__input__error");

  tipAmountCalculate(
    parseFloat(billElement.value),
    parseInt(key.target.value),
    parseInt(peopleNumberElement.value)
  );
});

customBtn.addEventListener("click", () => {
  const active = document.querySelector(".select__when__clicked");
  active.classList.remove("select__when__clicked");
});

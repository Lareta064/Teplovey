const sliderRange = document.getElementById('airflow-range');
const sliderInput = document.getElementById('airflow');

noUiSlider.create(sliderRange, {
    start: 500,
    range: {
        'min': [500, 100],
        '30%': [5000, 200],
        '70%': [20000, 1000],
        'max': [130000, 1000]
    },
    step: 100,
    connect: true,
    tooltips: false,
    pips: {mode: 'range', density: 4}
});

let sliderPips = sliderRange.querySelectorAll('.noUi-value');
const inputMin = sliderInput.getAttribute("min");
const inputMax = sliderInput.getAttribute("max");

function clickOnLengthPips() {
    let value = Number(this.getAttribute('data-value'));
    sliderRange.noUiSlider.set(value);
}

for (let i = 0; i < sliderPips.length; i++) {
    sliderPips[i].style.cursor = 'pointer';
    sliderPips[i].addEventListener('click', clickOnLengthPips);
}

// РЎРѕРѕР±С‰РµРЅРёРµ
const msgMin = document.querySelector(`[data-val="${inputMin}"]`);
const msgMax = document.querySelector(`[data-val="${inputMax}"]`);
const msgNoResult = document.querySelector(`[data-val="0"]`);
const msgItems = document.querySelectorAll(`.filter-form__info`);
const msgActive = "active";

function showMsg(val) {

    if (val < +inputMin) {
        msgMin.classList.add(msgActive);
    } else if (val > +inputMax) {
        msgMax.classList.add(msgActive);
    } else {
        msgItems.forEach(el => {
            el.classList.remove(msgActive);
        })
    }
}

sliderRange.noUiSlider.on('update', function (values, handle) {
    sliderInput.value = Math.round(values[handle]);
    showMsg(values[handle]);
});

sliderInput.addEventListener('change', function (e) {

    sliderRange.noUiSlider.set(this.value);
    showMsg(this.value);

    if ( this.value === '' ) {
        this.value = inputMin;
        sliderRange.noUiSlider.set(inputMin);
    }

});

sliderInput.addEventListener('input', function (e) {
    showMsg(this.value);
});

// Р¤РѕСЂРјР°

// Р”Р°РЅРЅС‹Рµ С„РѕСЂРјС‹
const searchForm = document.getElementById("filter-form");
const searchResultContainer = document.getElementById("filter-result");
const filterContainer = document.querySelector(".filter-container");

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    filterContainer.classList.add("preload");

    let params = new FormData(searchForm);
    params.append('action', 'getRecuperators');

    searchResultContainer.textContent = "";

    fetch('/recuperator-search', {
        method: "POST",
        cache: "no-cache",
        headers: {"X-Requested-With": "XMLHttpRequest"},
        body: params
    }).then(res => res.json())
        .then(result => {
            // console.log(result);

            if (+result.data.count > 0) {
                searchResultContainer.innerHTML = result.data.data;
            } else {
                msgNoResult.classList.add(msgActive);
            }
        })
        .catch(
            error => console.error(error)
        )

    setTimeout(function () {
        filterContainer.classList.remove("preload");
    }, 500);

})

// Р¤РѕСЂРјР° СЃРѕРѕР±С‰РµРЅРёСЏ

function feedbackForm() {
    let modalFeedback = document.getElementById("cbpopup");
    if ( modalFeedback !== undefined) {
        modalFeedback.classList.add("ult-open");
    }
    event.preventDefault();
}
function recuperatorForm() {
    let modalFeedback = document.getElementById("cbpopup");
    let modalMessage = document.querySelector(`#cbpopup textarea[name="message"]`);

    // console.log(modalMessage);

    if ( modalFeedback !== undefined && modalMessage !== undefined) {
        modalFeedback.classList.add("ult-open");

        msg = `РњРµРЅСЏ РёРЅС‚РµСЂРµСЃСѓРµС‚: `;
        msg += event.target.parentElement.querySelector(".filter-result-item__title").textContent.replace(/\n/g, " ").replace(/  +/g, ' ');
        msg += event.target.parentElement.querySelector(".filter-result-item__options").textContent.replace(/\n/g, " ").replace(/  +/g, ' ');

        modalMessage.value = msg;
    }
    event.preventDefault();
}
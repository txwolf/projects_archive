document.addEventListener('DOMContentLoaded', function () {
    let step1 = document.querySelector('#step1')
    load_dates()
})

async function load_dates() {
    const response = await fetch(`dates`);
    const dates = await response.json();
    console.log(dates);
    generate_days(dates)
}

function generate_days(dates) {
    // return dates in form of html
    let anchor = document.querySelector('#step1');
    console.log(dates);

    let inner = '';
    dates.forEach(date => {
        for (const prop in date) {
            switch (prop) {
                case 'date':
                    inner += `
                    <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-primary">
                        ${date.date}
                    </a>
                    `
                    break;
                case 'one':
                    if (date.one != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.one} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
                case 'two':
                    if (date.two != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.two} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
                case 'three':
                    if (date.three != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.three} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
                case 'four':
                    if (date.four != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.four} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
                case 'five':
                    if (date.five != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.five} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
                case 'six':
                    if (date.six != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.six} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
                case 'seven':
                    if (date.seven != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.seven} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
                case 'eight':
                    if (date.eight != 'empty') {
                        inner += `<a href=${cancel} data-date=${date.date} data-slot=${prop} class="list-group-item">${date.eight} <button type="button" class="btn btn-outline-danger btn-sm float-end">Cancel</button>
                        </a>`
                    } else {
                        inner += `<a href=${book} data-date=${date.date} data-slot=${prop} class="list-group-item">Free <button type="button" class="btn btn-outline-primary btn-sm float-end">Book</button></a>`
                    }
                    break;
            }
        }

        inner += `</div>`
    })

    anchor.innerHTML = inner;

    // let buttons = document.querySelectorAll('.clickable')
    // buttons.forEach(element =>
    //     element.onclick = function (e) {
    //         buttons = document.querySelectorAll('.clickable');
    //         buttons.forEach(btn => btn.classList.remove('active'));
    //         e.target.classList.add('active');
    //     })
}
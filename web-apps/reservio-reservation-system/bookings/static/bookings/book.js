let when = {};
let cart = [];
let email;
let reference;

document.addEventListener('DOMContentLoaded', function () {
    load_cart()
    load_services()

    let cartTable = document.querySelector('#cart-table');
    let cartButton = document.querySelector('#showcart');
    cartButton.onclick = function () {
        if (cartTable.classList.contains('show')) {
            cartTable.classList.remove("show")
        } else {
            cartTable.classList.add("show")
        }
    }

    let step1 = document.querySelector('#step1');
    let step1nav = document.querySelector('#step1nav');
    let step2 = document.querySelector('#step2');
    let step2nav = document.querySelector('#step2nav');
    let step3 = document.querySelector('#step3');
    let step3nav = document.querySelector('#step3nav')
    let success = document.querySelector('#success');

    step2.classList.add("hide");
    step3.classList.add("hide");
    success.classList.add("hide");


    let proceedButton = document.querySelector('#proceed');
    proceedButton.onclick = function () {
        //check if step one
        if (step1nav.classList.contains('active')) {
            if (!cart.length) {
                alert('You did not choose any service.');
            } else if (cart.lenght > 1) {
                alert('You can choose only one service.');
            } else {
                // #TODO correct highlighting
                // hide step 1 tab
                step1.classList.add("hide");
                // display step 2
                step2.classList.remove("hide");
                load_dates()
                // change highlight in nav
                step2nav.classList.remove('disabled');
                step2nav.classList.add('active');
                step1nav.classList.remove('active');
                //hide cart button
                cartButton.classList.add('hide');
            }
        } else if (step2nav.classList.contains('active')) {
            let selected = document.querySelector('.list-group-item.active');
            console.log(selected.dataset.date)
            when = {
                date: selected.dataset.date,
                slot: selected.dataset.slot
            }
            console.log(when)

            // TODO highlight nav3
            step3nav.classList.remove('disabled');
            step3nav.classList.add('active');
            step2nav.classList.remove('active');

            // TODO turn of proceed button
            proceedButton.classList.add('hide');

            //TODO swap to board 3
            step2.classList.add("hide");
            step3.classList.remove("hide");

            load_summary()

        }
    }
});

// 1. STEP 1 - choose services

async function fetch_services() {
    // load services from the server
    const response = await fetch(`services`);
    const services = await response.json();
    return services;
}

async function load_services() {
    let services = await fetch_services()


    // prepare a table with services
    let inner =
        `
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Description</th>
    <th>Price</th>
    <th></th>
    </tr>
    `

    services.forEach(service => {

        button = `<td><button class="add btn btn-primary btn-sm" data-id=${service.id}>Add</button></td>`

        inner +=
            `
    <tr data-id=${service.id}">
    <td>${service.id}</td>
    <td>${service.name}</td>
    <td>${service.description}</td>
    <td>${service.price} €</td>
    ${button}
    </tr>
    `
    })

    // append the table to the page
    let table = document.createElement('table')
    table.classList.add('table', 'mt-3');
    table.innerHTML = inner;

    let anchor = document.querySelector('#services-table')
    anchor.appendChild(table);

    // add listeners for add to cart buttons
    const buttons = document.querySelectorAll('.add');
    buttons.forEach(element => element.onclick = function (e) {
        add(e, services)
    });
}

function load_cart() {
    let anchor = document.querySelector('#cart-table')
    anchor.innerHTML = '';
    let inner =
        `
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Description</th>
    <th>Price</th>
    <th></th>
    </tr>
    `;

    if (!cart.length) {
        inner +=
            `
            <tr>
            <td colspan="6">Cart is empty</td>
            </tr>
            `;
    } else {
        // prepare a table with services
        cart.forEach(service => {

            button = `<td><button class="remove btn btn-danger btn-sm" data-id=${service.id}>Remove</button></td>`

            inner +=
                `
                <tr data-id=${service.id}">
                <td>${service.id}</td>
                <td>${service.name}</td>
                <td>${service.description}</td>
                <td>${service.price}</td>
                ${button}
                </tr>
                `
        })
    }

    // append the table to the page
    let table = document.createElement('table')
    table.classList.add('table', 'mt-3');
    table.innerHTML = inner;

    anchor.appendChild(table);

    // add listeners for add to cart buttons
    const buttons = document.querySelectorAll('.remove');
    buttons.forEach(element => element.onclick = function (e) {
        remove(e)
    });

}

function add(e, services) {
    // convert from caller to service
    const id = e.target.dataset.id;
    let found = services.find(obj => { return obj.id == id });
    console.log(found);
    // add this service to the cart
    cart.push(found);
    console.log(cart);
    // reload cart
    load_cart(cart);

    // change the badge
    let badge = document.querySelector('.badge');
    badge.innerHTML = cart.length
}

function remove(e) {
    // convert from caller to service
    const id = e.target.dataset.id;
    cart = cart.filter(obj => obj.id != id);
    console.log(cart);
    // reload cart
    load_cart(cart);

    let badge = document.querySelector('.badge');
    badge.innerHTML = cart.length;
}

// PHASE 2 - choose dates

async function load_dates() {
    const response = await fetch(`dates`);
    const dates = await response.json();
    console.log(dates);
    generate_days(dates)
}

function generate_days(dates) {
    // return dates in form of html
    let anchor = document.querySelector('#days-anchor');
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
                    if (date.one == 'empty') {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">9:00-10:00</a>`
                    } else {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    }
                    break;
                case 'two':
                    if (date.two != 'empty') {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    } else {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">10:00-11:00</a>`
                    }
                    break;
                case 'three':
                    if (date.three != 'empty') {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    } else {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">11:00-12:00</a>`
                    }
                    break;
                case 'four':
                    if (date.four != 'empty') {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    } else {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">12:00-13:00</a>`
                    }
                    break;
                case 'five':
                    if (date.five != 'empty') {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    } else {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">13:00-14:00</a>`
                    }
                    break;
                case 'six':
                    if (date.six != 'empty') {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    } else {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">14:00-15:00</a>`
                    }
                    break;
                case 'seven':
                    if (date.seven != 'empty') {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    } else {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">15:00-16:00</a>`
                    }
                    break;
                case 'eight':
                    if (date.eight != 'empty') {
                        inner += `<a href="javascript:;" class="list-group-item disabled"></a>`
                    } else {
                        inner += `<a href="javascript:;" data-date=${date.date} data-slot=${prop} class="list-group-item clickable">16:00-17:00</a>`
                    }
                    break;
            }
        }

        inner += `</div>`
    })

    anchor.innerHTML = inner;

    let buttons = document.querySelectorAll('.clickable')
    buttons.forEach(element =>
        element.onclick = function (e) {
            buttons = document.querySelectorAll('.clickable');
            buttons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        })
}

// PHASE 3 - summarize

function load_summary() {
    let anchor = document.querySelector('#step3');
    // generate the form
    // generate the cart
    let inner = '';
    inner += `<h4 class='mt-3'>Choosen services:</h4>
    <ul class="list-group col-sm-10 mx-auto mt-3">`;
    cart.forEach(service => {
        inner += `<li class="list-group-item disabled">${service.name}</li>`;
    })
    inner += ` </ul>`;

    // generate date
    inner += `<h4 class='mt-3'>Choosen date:</h4>
    <ul class="list-group col-sm-10 mx-auto mt-3">
    <li class="list-group-item disabled">${when.date}</li>`;

    switch (when.slot) {
        case 'one':
            inner += `<li class="list-group-item disabled">09:00-10:00</li>`;

            break;
        case 'two':

            inner += `<li class="list-group-item disabled">10:00-11:00</li>`;

            break;
        case 'three':

            inner += `<li class="list-group-item disabled">11:00-12:00</li>`;

            break;
        case 'four':

            inner += `<li class="list-group-item disabled">12:00-13:00</li>`;

            break;
        case 'five':

            inner += `<li class="list-group-item disabled">13:00-14:00</li>`;

            break;
        case 'six':

            inner += `<li class="list-group-item disabled">14:00-15:00</li>`;

            break;
        case 'seven':

            inner += `<li class="list-group-item disabled">15:00-16:00</li>`;

            break;
        case 'eight':

            inner += `<li class="list-group-item disabled">16:00-17:00</li>`;

            break;
    }
    inner += ` </ul>`;

    // generate form to fill details
    // email
    inner += `
        <h4 class='mt-3'>Your Email:</h4>
        <form>
    <div class="form-group row mt-3">
        <div class="col-sm-10 mx-auto">
        <input type="email" class="form-control" id="inputEmail" placeholder="Email" required>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-10 mx-auto">
        <div class="form-check mt-3">
            <input class="form-check-input" type="checkbox" id="gridCheck1" required>
            <label class="form-check-label" for="gridCheck1">
            Agree to terms and conditions
            </label>
        </div>
        </div>
    </div>
    <div class="form-group row my-3 mx-auto col-sm-4">
        <button type="submit" id='form-submit' class="btn btn-primary">Confirm Booking</button>
    </div>
    </form>`

    anchor.innerHTML = inner;
    // var x = document.getElementById("myCheck").required;



    let form = document.querySelector('form')
    form.onsubmit = async function (e) {
        e.preventDefault();
        // get data from the form
        let emailField = document.querySelector('#inputEmail');
        email = emailField.value;
        console.log(email);
        //send the data to django
        await upload_booking();
        //display board 4 - success (after success)
        display_success();
    }

}

async function upload_booking() {
    const response = await fetch('book', {
        headers: { 'X-CSRFToken': csrftoken },
        method: 'POST',
        body: JSON.stringify({
            service_id: cart[0].id,
            date: when.date,
            slot: when.slot,
            email: email,
        })
    })
    reference = await response.json();
    console.log(reference);
    return reference;
}

function display_success() {
    let anchor = document.querySelector('#success');
    let inner =
        `
    <div class='col-lg-6 mx-auto mt-5'>
    <h4 class='text-center mb-3'>Your visit is booked!</h4>
    <p class='lead text-center'>Reference number: <span class="fw-bold">${reference}</span></p>
    <p class='lead text-center'>Email confirmation is sent to <span class="fw-bold">${email}</span></p>
    <p class='lead text-center'>We expect to see you on ${when.date}!</p>
    </div>
    `

    anchor.innerHTML = inner;

    let step3 = document.querySelector('#step3');
    step3.classList.add('hide');
    let nav = document.querySelector('.nav-pills');
    nav.classList.add('hide');

}




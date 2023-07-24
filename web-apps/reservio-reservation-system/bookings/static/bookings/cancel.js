document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form')

    form.onsubmit = function (e) {
        e.preventDefault();
        find()
    }
    let service;
    let ref;
    async function find() {
        ref = document.querySelector('#ref')
        ref = ref.value
        console.log(ref)

        const response = await fetch('cancel', {
            headers: { 'X-CSRFToken': csrftoken },
            method: 'POST',
            body: JSON.stringify({
                reference: ref,
            })
        })
        const booking = await response.json();
        console.log(booking)
        if (booking != 'Not found') {
            const obj = JSON.parse(booking)
            service = obj.service
            console.log(obj.service)
        }
        confirmation()
    }

    function confirmation() {
        let anchor = document.querySelector('#step-2');
        let inner;
        if (service) {
            inner = `
        <h4 class='text-center mt-3'>Cancel Booking</h4>
        <p class='lead mt-3 text-center'>Please confirm cancellation of your booking for ${service}</p>
        <div class='row mx-auto col-6'>
        <button id='cancel-button' class="btn btn-primary mx-auto">Cancel</button>
    </div>
        `} else {
            inner = `
        <h4 class='text-center mt-3'>Booking not found!</h4>
        <p class='text-center lead mt-3'>Please check if reference number is correct.</p>
 `
        }

        anchor.innerHTML = inner;
        let step1 = document.querySelector('#step-1')
        let step2 = document.querySelector('#step-2')
        step1.classList.add('hide')
        step2.classList.remove('hide')

        let cancelButton = document.querySelector('#cancel-button')
        cancelButton.onclick = function () {
            anchor.innerHTML = "<h4 class='text-center mt-3'>Success!</h4><p class='text-center lead mt-3'>Your booking is cancelled.</p>"

            fetch_cancel()
        }
    }

    async function fetch_cancel() {
        const response = await fetch('cancel', {
            headers: { 'X-CSRFToken': csrftoken },
            method: 'PUT',
            body: JSON.stringify({
                reference: ref,
            })
        })
    }


});






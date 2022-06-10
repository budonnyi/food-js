import {openModal, closeModal} from './modal';
import {postdata} from '../services/services';

function forms(formSelector, modalTimerId) {
    // forms

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасібо',
        failure: 'Чтото пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });
            const jsonFormData = JSON.stringify(Object.fromEntries(formData.entries()));

            // const json = JSON.stringify(object);

            // request.send(json);

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: json
            // })

            postData('http://localhost:3000/requests', jsonFormData)
                // .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);

                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });

            // request.addEventListener('load', () => {
            //     if(request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //         clearInterval(modalTimerId);
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // })
        });

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal('.modal', modalTimerId);

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(()=> {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal('.modal');
            }, 4000);
        }
    }
}

export default forms;
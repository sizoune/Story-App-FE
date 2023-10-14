import { Modal } from 'bootstrap';

const Show = {
  errorDialog(errorMsg) {
    const dialogBody = document.querySelector('#dialog-body');
    const myModal = document.querySelector('#myModal');
    dialogBody.innerHTML = `
      <custom-dialog
        dialogSvgPath='/asset/error.json'
        dialogMsg='${errorMsg}'
        isForeverLoop = 'true'
      ></custom-dialog>
    `;
    new Modal(myModal).show();
  },

  successDialog(successMsg, onDialogDismissed) {
    const dialogBody = document.querySelector('#dialog-body');
    const myModal = document.querySelector('#myModal');
    dialogBody.innerHTML = `
      <custom-dialog
        dialogSvgPath='/asset/success.json'
        dialogMsg='${successMsg}'
      ></custom-dialog>
    `;
    new Modal(myModal).show();
    myModal.addEventListener('hidden.bs.modal', (event) => {
      onDialogDismissed();
    });
  },
};

export default Show;
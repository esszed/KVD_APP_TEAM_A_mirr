function openModal(maxCount) {
    document.getElementById('deleteMaxCount').setAttribute('value', maxCount);
    document.getElementById('deleteModal').hidden = false;
}

function validate() {
    let count = parseInt(document.getElementById('deleteCount').value);
    let maxCount = parseInt(document.getElementById('deleteMaxCount').value);
    let warningText = document.getElementById('warningText');
    let sendButton = document.getElementById('sendButton');

    if (count > maxCount || count < 1) {
        warningText.innerHTML = 'Možnost vybrat od 1 do ' + maxCount + ' položek.';
        sendButton.disabled = true;
    } else {
        warningText.innerHTML = '';
        sendButton.disabled = false;
    }
}
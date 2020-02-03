function openModal(maxCount) {
    document.getElementById('borrowMaxCount').setAttribute('value', maxCount);
    document.getElementById('borrowModal').hidden = false;
}

function validate() {
    let count = parseInt(document.getElementById('borrowCount').value);
    let maxCount = parseInt(document.getElementById('borrowMaxCount').value);
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
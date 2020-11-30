var copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied!');
    }).catch((error) => {
        alert(error);
    });
}
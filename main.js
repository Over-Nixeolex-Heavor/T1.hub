document.addEventListener('DOMContentLoaded', () => {
    const lootlabsBtn = document.getElementById('lootlabs');
    const linkvertiseBtn = document.getElementById('linkvertise');

    lootlabsBtn.addEventListener('click', () => {
        window.open('https://lootdest.org/s?PXJLZF1X', '_blank');
    });

    linkvertiseBtn.addEventListener('click', () => {
        // Show notification
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('This link is unfinished!');
                } else {
                    alert('This link is unfinished!');
                }
            });
        } else {
            alert('This link is unfinished!');
        }
    });
});

const modal = document.getElementById('modal')
const iframe = document.querySelector('iframe')

modal.addEventListener('show.bs.modal', e => {
    const target = e.relatedTarget;
    const value = target.getAttribute('data-value');

    switch (value) {
        case 'movie':
            const id = target.getAttribute('data-id');
            iframe.src = `/movies/${id}`;
            break;
        case 'wishlist':
            iframe.src = '/wishlist';
            break;
        case 'account':
            iframe.src = '/account';
            break;
    }
});
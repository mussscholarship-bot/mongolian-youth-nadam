document.addEventListener('DOMContentLoaded', function () {
    // Scroll to error on page load
    const errorEl = document.querySelector('.alert-error');
    if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

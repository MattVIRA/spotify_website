document.addEventListener('DOMContentLoaded', function() {
    const featureBoxes = document.querySelectorAll('.feature-box');

    featureBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const url = box.getAttribute('data-url');
            if (url) {
                window.location.href = url; 
            }
        });
    });
});

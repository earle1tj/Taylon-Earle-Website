$(document).ready(function () {
    setTimeout(function () {
        $('#preloader').fadeOut(250, function () {
            $(this).remove();
        });
    }, 250);
});


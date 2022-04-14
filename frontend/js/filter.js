
const filter_btn = document.querySelector('.filter_btn');
const side_menu = document.querySelector('#sidebar');
const outer_frame = document.querySelector('#outer_frame');
filter_btn.firstChild.data = "Filter >";

filter_btn.addEventListener('click', function() {
    filter_btn.classList.toggle('is-active');
    side_menu.classList.toggle('is-active');
    outer_frame.classList.toggle('is-active');

    filter_btn.firstChild.data = filter_btn.firstChild.data == "<" ? "Filter >" : "<";
});

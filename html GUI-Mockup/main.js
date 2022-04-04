window.onload = function () {
    

    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('#mobilebar1');
    const blend_btn = document.querySelector('.blend_in');
    const side_menu = document.querySelector('#sidebar');
    const frame = document.querySelector('#theFrame');
    blend_btn.firstChild.data = "Filter >";
    menu_btn.addEventListener('click', function() {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
    blend_btn.addEventListener('click', function() {
        blend_btn.classList.toggle('is-active');
        side_menu.classList.toggle('is-active');
        frame.classList.toggle('is-active');

        blend_btn.firstChild.data = blend_btn.firstChild.data == "<" ? "Filter >" : "<";
    });
}




function myFunction(i) {
    if (i==1){
        var x = document.getElementById("mobilebar1");
    } else {
        var x = document.getElementById("mobilebar2");
    }
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
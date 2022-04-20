
export default function Hamburger() {
    return(
        <button className="hamburger" onClick={() => HamburgerScript()}>
            <div className="bar"></div>
        </button>
    );
}

function HamburgerScript() {
    const menu_btn = document.querySelector('.hamburger');
    const mob_menu = document.querySelector('#mobilebar');

    menu_btn.classList.toggle('is-active');
    mob_menu.classList.toggle('is-active');
}
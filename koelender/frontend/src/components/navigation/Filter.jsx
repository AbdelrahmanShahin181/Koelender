
export default function Filter() {
    return(
        <>
        <div id="sidebar" className="sidenav">
        <button className="filter_btn" onClick={()=>FilterScript()}>Filter {'\u003E'}</button>
            <ul id="sidemenu">
                <li><input id="search" type="text" name="search" placeholder="Suche..."/></li>
                <li>
                    <h3 id="filterHeader">Filter</h3>
                </li>
                
                {/*ToDo: Hier werden die Filteroptionen generiert*/}

                <li>
                    <button id = "search_btn" type="button">Suchen</button>
                </li>
            </ul>
        </div>
        </>
    );
}

function FilterScript() {
    const filter_btn = document.querySelector('.filter_btn');
    const filter_menu = document.querySelector('#sidebar');
    const outer_frame = document.querySelector('#outer_frame');
    const checkboxes = document.querySelector('#checkboxes');
    const columns_btn = document.querySelector('.hide_columns');

    filter_btn.classList.toggle('is-active');
    filter_menu.classList.toggle('is-active');
    outer_frame.classList.toggle('is-active');
    if(checkboxes !== null) {
        checkboxes.classList.toggle('menu-is-active');
        columns_btn.classList.toggle('menu-is-active');
    }

    filter_btn.childNodes[0].data = filter_btn.childNodes[0].data === "<" ? "Filter >" : "<";
    filter_btn.childNodes[1].data = "";
}
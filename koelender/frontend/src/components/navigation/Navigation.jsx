
export default function Navigation({type}) {
    return(
        <ul id = {type + "menu"}>
            <div id = {type+"_myLinks"}>
                <li><a href="/kalender">Kalender</a></li>
                <li><a href="/uebersicht">Übersicht</a></li>
                <li><a href="#export">Export</a></li>
            </div>
            <div id={type + "_login"}>
                <li><input type="text" name="search" placeholder="Username..."/></li>
                <li><input  type="password" name="search" placeholder="Passwort..."/></li>
                <li><button  type="button">Login</button></li>
            </div>
        </ul>
    );
}

export default function fetchPruefungen(a) {
    //fetch("http://192.168.0.105:8000/api/liste/",{
    //fetch("http://192.168.0.83:8000/api/liste/",{
    fetch("http://localhost:8000/api/liste/",{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())

    .then(
        (result) => {
            a.setState({
                isLoaded: true,
                pruefungen: result,
            });
        },
        (error) => {
            a.setState({
                isLoaded: true,
                error
            });
        }
    )
}
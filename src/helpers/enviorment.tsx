let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':

        APIURL = 'http://localhost:3000';
        break;
    case 'kpt-power-board-client.herokuapp.com/':
        // APIURL = 'https://kpt-powerboard.herokuapp.com/'
        APIURL = 'http://localhost:3000'
}

export default APIURL
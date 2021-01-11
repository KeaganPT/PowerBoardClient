let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':

        APIURL = 'http://localhost:3000';
        break;
    case 'https://kpt-power-board-client.herokuapp.com/':
        APIURL = 'https://kpt-power-board-client.herokuapp.com/'
}

export default APIURL
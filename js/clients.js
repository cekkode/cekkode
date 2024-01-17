// Version of the script
var version = "1.1.3";
console.log("Script Version: " + version);

// Google Cloud API key
var apiKey = 'AIzaSyD1fPFIgLPU6uHuM3TLMN4UP0VHIcQLuWo';

var domain = window.location.hostname;
var domainParts = domain.split('.');
var subdomain = null;
var mainDomain = null;

if (domainParts.length === 3 && domainParts[1].length === 2) {
    mainDomain = domainParts.join('.');
} else if (domainParts.length > 2) {
    subdomain = domainParts[0].toUpperCase();
    mainDomain = domainParts.slice(1).join('.');
} else {
    mainDomain = domain;
}

var sheetId = '1bwvWm-HABNjnDPpbCr77XQ1dmw1XmsSwOaAWvxIv5t4';
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + mainDomain + '?key=' + apiKey;

fetch(url)
    .then(response => response.json())
    .then(data => {
        var page = window.location.pathname;
        var pageParts = page.split('/');
        var pageName = pageParts[pageParts.length - 1].replace('.html', '').replace(/-/g, ' ');

        var headers = data.values[0];
        var locationIndex = headers.indexOf('📍');
        var personIndex = subdomain ? headers.indexOf(subdomain + ':🧑🏻') : headers.indexOf('🧑🏻');
        var phoneIndex = subdomain ? headers.indexOf(subdomain + ':📞') : headers.indexOf('📞');
        var messageIndex = subdomain ? headers.indexOf(subdomain + ':💬') : headers.indexOf('💬');
        var tagIndex = subdomain ? headers.indexOf(subdomain + ':🏷️') : headers.indexOf('🏷️');

        for (var i = 1; i < data.values.length; i++) {
            if (data.values[i][locationIndex] && (data.values[i][locationIndex].toLowerCase().includes(pageName.toLowerCase()) || data.values[i][locationIndex].toLowerCase().includes(pageName.replace(' ', '').toLowerCase()))) {
                var person = data.values[i][personIndex];
                var phone = data.values[i][phoneIndex];
                var message = data.values[i][messageIndex];
                var tag = data.values[i][tagIndex];

                console.log('🧑🏻: ' + person);
                console.log('📞: ' + phone);
                console.log('💬: ' + message);
                console.log('🏷️: ' + tag);

                var whatsappFloating = document.querySelector('.whatsapp-floating a');
                var tlpFloating = document.querySelector('.tlp-floating a');

                if (whatsappFloating) {
                    whatsappFloating.href = message.startsWith('https://') ? message : 'https://' + message;
                    whatsappFloating.innerHTML = `<img src="https://1.bp.blogspot.com/-Y1SNUYeVK44/XhZwF187--I/AAAAAAAAHfA/lfOZFsZCF885e8rLL6NleS8vxHTcz_v1ACLcBGAsYHQ/s1600/whatsapp%2Bicon.png" alt="whatsapp" style="height:18px !important; margin-right:5px;  margin-top:7px;  cursor:pointer; float:left;"><span style="float:right;">${phone} (${person})</span>`;
                }

                if (tlpFloating) {
                    tlpFloating.href = 'tel:' + phone;
                    tlpFloating.innerHTML = `<img src="https://1.bp.blogspot.com/-37NtuGBQHdw/XhZwF_W04vI/AAAAAAAAHe8/6QEm7CRzPoMfN01Yl3stD89xpmuFUcTyQCLcBGAsYHQ/s1600/phone%2Bicon.png" alt="whatsapp" style="height:18px !important; margin-right:5px;  margin-top:7px;  cursor:pointer; float:left;"><span style="float:right;">${phone} (${person})</span>`;
                }

                break;
            }
        }
    })
    .catch(err => console.error(err));
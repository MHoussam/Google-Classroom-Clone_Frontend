// TODO: Set the below credentials
const CLIENT_ID = '571160605148-tgsjqp9eqlbvt4r803t6nuehaqgjef9n.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA4-zztE67L4yDWc8n5E0G9hC7_NS2EVI4';

// Discovery URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Set API access scope before proceeding authorization request
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('file-input').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
	gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
	await gapi.client.init({
		apiKey: API_KEY,
		discoveryDocs: [DISCOVERY_DOC],
	});
	gapiInited = true;
	maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
	tokenClient = google.accounts.oauth2.initTokenClient({
		client_id: CLIENT_ID,
		scope: SCOPES,
		callback: '', // defined later
	});
	gisInited = true;
	maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
	if (gapiInited && gisInited) {
		document.getElementById('file-input').style.visibility = 'visible';
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
	tokenClient.callback = async (resp) => {
		if (resp.error !== undefined) {
			throw (resp);
		}
		document.getElementById('signout_button').style.visibility = 'visible';
		//document.getElementById('file-input').value = 'Refresh';
		//await uploadFile();
	};

	if (gapi.client.getToken() === null) {
		// Prompt the user to select a Google Account and ask for consent to share their data
		// when establishing a new session.
		tokenClient.requestAccessToken({ prompt: 'consent' });
	} else {
		// Skip display of account chooser and consent dialog for an existing session.
		tokenClient.requestAccessToken({ prompt: '' });
	}
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
	const token = gapi.client.getToken();
	if (token !== null) {
		google.accounts.oauth2.revoke(token.access_token);
		gapi.client.setToken('');
		document.getElementById('content').style.display = 'none';
		document.getElementById('content').innerHTML = '';
		document.getElementById('file-input').value = 'Authorize';
		document.getElementById('signout_button').style.visibility = 'hidden';
	}
}

/**
 * Upload file to Google Drive.
 */
async function uploadFile() {
	//var fileContent = 'Hello World'; // As a sample, upload a text file.
	let file_input = document.getElementById('file-input')
	const selectedFile = file_input.files[0];
	const fileName = selectedFile.name;
	const fileExtension = fileName.split('.').pop().toLowerCase();
	console.log(fileName)
	console.log(fileExtension)
	if (!(['txt', 'pdf', 'docx', 'png', 'jpeg', 'jpg', 'svg', 'zip', 'rar', 'ppt', 'pptx', 'doc'].indexOf(fileExtension) === -1 )) {
	 	console.log('Good');

		var fileLink='';
	
		var fileContent = file_input;
		var file;
		var fileType;

		if(fileExtension == 'txt') {
			fileType = 'text/plain'
		} else if(fileExtension == 'pdf') {
			fileType = 'application/pdf'
		} else if(fileExtension == 'doc') {
			fileType = 'application/msword'
		} else if(fileExtension == 'docx') {
			fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		} else if(fileExtension == 'ppt') {
			fileType = 'application/vnd.ms-powerpoint'
		} else if(fileExtension == 'pptx') {
			fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
		} else if(fileExtension == 'png') {
			fileType = 'image/png'
		} else if(fileExtension == 'jpg') {
			fileType = 'image/jpg'
		} else if(fileExtension == 'jpeg') {
			fileType = 'image/jpeg'
		} else if(fileExtension == 'svg') {
			fileType = 'image/svg+xml'
		} else if(fileExtension == 'zip') {
			fileType = 'application/zip'
		} else if(fileExtension == 'rar') {
			fileType = 'application/x-rar-compressed'
		}

		file = new Blob([fileContent], { type: fileType });

		var metadata = {
			'name': fileName, // Filename at Google Drive
			'mimeType': fileType, // mimeType at Google Drive
			// TODO [Optional]: Set the below credentials
			// Note: remove this parameter, if no target is needed
			//'parents': ['SET-GOOGLE-DRIVE-FOLDER-ID'], // Folder ID at Google Drive which is optional
		};

		var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
		var form = new FormData();
		form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
		form.append('file', fileContent.files[0]);

		var xhr = new XMLHttpRequest();
		xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
		xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		xhr.responseType = 'json';
		xhr.onload = () => {
			//document.getElementById('content').innerHTML = "File uploaded successfully. The Google Drive file id is <b>" + xhr.response.id + "</b>";
			//document.getElementById('content').style.display = 'block';

			fileLink = 'https://drive.google.com/file/d/' + xhr.response.id + '/view?usp=drive_link';
            console.log(fileLink);
			//document.getElementById('content').innerHTML += fileLink;
		};
		xhr.send(form);

		let assign = document.getElementById('assign')
		assign.textContent = 'Submitted';
	}
}
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *//**
 * Scan these barcode types
 * Available: "PDF417", "USDL", "QR Code", "Code 128", "Code 39", "EAN 13", "EAN 8", "ITF", "UPCA", "UPCE"
 */


var types = ["PDF417", "QR Code"];

/**
 * Initiate scan with options
 * NOTE: Some features are unavailable without a license
 * Obtain your key at http://pdf417.mobi
 */
var options = {
    beep : true,  // Beep on
    noDialog : true, // Skip confirm dialog after scan
    uncertain : false, //Recommended
    quietZone : false, //Recommended
    highRes : false, //Recommended
    inverseScanning: false,
    frontFace : false
};

// Note that each platform requires its own license key

// This license key allows setting overlay views for this application ID: mobi.pdf417.demo
var licenseiOs = "RZNIT6NY-YUY2L44B-JY4C3TC7-LE5LFU2B-JOAF4FO3-L5MTVMWT-IFFYAXQV-3NPQQA4G";

// This license is only valid for package name "mobi.pdf417.demo"
var licenseAndroid = "UDPICR2T-RA2LGTSD-YTEONPSJ-LE4WWOWC-5ICAIBAE-AQCAIBAE-AQCAIBAE-AQCFKMFM";

// This license is only valid for Product ID "e2994220-6b3d-11e5-a1d6-4be717ee9e23"
var licenseWP8 = "5JKGDHZK-5WN4KMQO-6TZU3KDQ-I4YN67V5-XSN4FFS3-OZFAXHK7-EMETU6XD-EY74TM4T";    
    
scanCode = function () {    
		cordova.plugins.pdf417Scanner.scan(
		
			// Register the callback handler
			function callback(scanningResult) {
				
				// handle cancelled scanning
				if (scanningResult.cancelled == true) {
					resultDiv.innerHTML = "Cancelled!";
					return;
				}
				
				// Obtain list of recognizer results
				var resultList = scanningResult.resultList;
				
				// Iterate through all results
				for (var i = 0; i < resultList.length; i++) {

					// Get individual result
					var recognizerResult = resultList[i];

					if (recognizerResult.resultType == "Barcode result") {
						// handle Barcode scanning result

						resultDiv.innerHTML = "Data: " + recognizerResult.data +
										   " (raw: " + hex2a(recognizerResult.raw) + ")" +
										   " (Type: " + recognizerResult.type + ")";

					} else if (recognizerResult.resultType == "USDL result") {
						// handle USDL parsing result

						var fields = recognizerResult.fields;

						resultDiv.innerHTML = /** Personal information */
										   "USDL version: " + fields[kPPAamvaVersionNumber] + "; " +
											"Family name: " + fields[kPPCustomerFamilyName] + "; " +
											"First name: " + fields[kPPCustomerFirstName] + "; " +
											"Date of birth: " + fields[kPPDateOfBirth] + "; " +
											"Sex: " + fields[kPPSex] + "; " +
											"Eye color: " + fields[kPPEyeColor] + "; " +
											"Height: " + fields[kPPHeight] + "; " +
											"Street: " + fields[kPPAddressStreet] + "; " +
											"City: " + fields[kPPAddressCity] + "; " +
											"Jurisdiction: " + fields[kPPAddressJurisdictionCode] + "; " +
											"Postal code: " + fields[kPPAddressPostalCode] + "; " +

											/** License information */
											"Issue date: " + fields[kPPDocumentIssueDate] + "; " +
											"Expiration date: " + fields[kPPDocumentExpirationDate] + "; " +
											"Issuer ID: " + fields[kPPIssuerIdentificationNumber] + "; " +
											"Jurisdiction version: " + fields[kPPJurisdictionVersionNumber] + "; " +
											"Vehicle class: " + fields[kPPJurisdictionVehicleClass] + "; " +
											"Restrictions: " + fields[kPPJurisdictionRestrictionCodes] + "; " +
											"Endorsments: " + fields[kPPJurisdictionEndorsementCodes] + "; " +
											"Customer ID: " + fields[kPPCustomerIdNumber] + "; ";
					}
				}
			},
			
			// Register the error callback
			function errorHandler(err) {
				alert('Error');
			},

			types, options, licenseiOs, licenseAndroid
		);
	});






function onPushwooshInitialized(pushNotification) {

    //if you need push token at a later time you can always get it from Pushwoosh plugin
    pushNotification.getPushToken(
        function(token) {
            console.info('push token: ' + token);
        }
    );

    //and HWID if you want to communicate with Pushwoosh API
    pushNotification.getPushwooshHWID(
        function(token) {
            console.info('Pushwoosh HWID: ' + token);
        }
    );

    //settings tags
    pushNotification.setTags({
            tagName: "tagValue",
            intTagName: 10
        },
        function(status) {
            console.info('setTags success: ' + JSON.stringify(status));
        },
        function(status) {
            console.warn('setTags failed');
        }
    );

    pushNotification.getTags(
        function(status) {
            console.info('getTags success: ' + JSON.stringify(status));
        },
        function(status) {
            console.warn('getTags failed');
        }
    );

    //start geo tracking.
    //pushNotification.startLocationTracking();
}

function initPushwoosh() {
    var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

    //set push notifications handler
    document.addEventListener('push-notification',
        function(event) {
            var message = event.notification.message;
            var userData = event.notification.userdata;

            document.getElementById("pushMessage").innerHTML = message + "<p>";
            document.getElementById("pushData").innerHTML = JSON.stringify(event.notification) + "<p>";

            //dump custom data to the console if it exists
            if (typeof(userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }
        }
    );

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({
        projectid: "60756016005",
        appid: "4FC89B6D14A655.46488481",
        serviceName: ""
    });

    //register for push notifications
    pushNotification.registerDevice(
        function(status) {
            document.getElementById("pushToken").innerHTML = status.pushToken + "<p>";
            onPushwooshInitialized(pushNotification);
        },
        function(status) {
            alert("failed to register: " + status);
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        scanCode()
        initPushwoosh();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

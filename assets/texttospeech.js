/*
 * Check for browser support
 */

 // Available voices
var availableVoices = [];

 // Lang voices. Voices corresponding to a certain language
var langVoices = [];

 // Selected voice
 var selectedVoice; 

 // Selected voice index from lang voices array
 var selectedVoiceIndexFromLangVoices = -1;

 var VOICE_CONFIG_KEY = "Voice-Config";

 var requestFullscreen = function (ele) {
	if (ele.requestFullscreen) {
		ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};

var exitFullscreen = function () {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};

function WebRequestFullscreen() 
{
    requestFullscreen(document.documentElement);
}

function WebLeaveFullscreen()
{
    exitFullscreen(document.documentElement);
}

function WebSpeechCheckBrowserSupport() 
{
    if ('speechSynthesis' in window) {
        // The browser supports speech synthesis
    } else {
        // The browser DOES NOT supports speech synthesis
    }
}

// Fetch the list of voices and populate the voice options.
function loadVoices() {
    // Fetch the available voices.
    var voices = speechSynthesis.getVoices();
      
    // Loop through each of the voices.
	voices.forEach(function(voice, i) {
       availableVoices.push(voice);
	});
}

// Load voices
function WebSpeechLoadVoices()
{
    availableVoices = [];

    // Execute loadVoices.
    loadVoices();

    // Chrome loads voices asynchronously.
    window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
    };
}

// Get the available voices for a given language
function WebSpeechSpeakLangAvailableVoices(lang,clear=false)
{
    if(clear)
    {
        langVoices = [];
    }

    for(var i = 0; i < availableVoices.length; i++)
    {
        if(availableVoices[i].lang === lang)
        {
            langVoices.push(availableVoices[i]);          
        }
    }
}

// Set the voice to speek
function WebSpeechSetVoice(voice)
{
    selectedVoice = voice;

    //console.log("WebSpeechSetVoice: Voice name = " + voice.name);
}

// Set voice by name
function WebSpeechSetVoiceByName(voiceName)
{
    selectedVoiceIndexFromLangVoices = -1;
    
    for(var i = 0; i < langVoices.length; i++)
    {
        if(langVoices[i].name === voiceName)
        {
            WebSpeechSetVoice(langVoices[i]);
            selectedVoiceIndexFromLangVoices = i;
            
            // Save the voice name on local storage
            localStorage.setItem(VOICE_CONFIG_KEY,voiceName);
        }
    }
}

// Create a new utterance for the specified text and add it to
// the queue.
function WebSpeechSpeak(text) {

    /*
    var langVoices = WebSpeechSpeakLangAvailableVoices("pt-BR");

    // TESTE
    WebSpeechSetVoice(langVoices[0]);
    */

    // If the app is speaking, we should wait it to finish first. So we
    // discard this call when a speaking is going
    if(!window.speechSynthesis.speaking)
    {
        // Create a new instance of SpeechSynthesisUtterance.
            var msg = new SpeechSynthesisUtterance();
        
        // Set the text.
            msg.text = text;
        
        // Set the attributes.
            //msg.volume = parseFloat(volumeInput.value);
            //msg.rate = parseFloat(rateInput.value);
            //msg.pitch = parseFloat(pitchInput.value);
            
        // Set the voice
            msg.voice = selectedVoice;

        // Queue this utterance.
            window.speechSynthesis.speak(msg);
    }
}

export{ availableVoices, langVoices, VOICE_CONFIG_KEY, selectedVoiceIndexFromLangVoices, WebSpeechSpeak, WebSpeechSetVoiceByName, WebSpeechSpeakLangAvailableVoices, WebSpeechLoadVoices, WebRequestFullscreen, WebLeaveFullscreen};


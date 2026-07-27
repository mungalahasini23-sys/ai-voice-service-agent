import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(onFinalResult) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let currentTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                currentTranscript += event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    setTranscript(currentTranscript);
                    onFinalResult(currentTranscript);
                } else {
                    setTranscript(currentTranscript);
                }
            }
        };

        recognition.onstart = () => setListening(true);

        recognition.onend = () => setListening(false);

        recognitionRef.current = recognition;

    }, [onFinalResult]);

    const startListening = () => {

        setTranscript("");

        recognitionRef.current?.start();

    };

    const stopListening = () => {

        recognitionRef.current?.stop();

    };

    return {

        listening,

        transcript,

        startListening,

        stopListening

    };
}
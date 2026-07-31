import { useEffect, useState } from "react";

export default function useSpeechSynthesis() {

    const [speaking, setSpeaking] = useState(false);

    const speak = (text, onFinish) => {

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            setSpeaking(true);
        };

        utterance.onend = () => {
            setSpeaking(false);
            onFinish?.();
        };

        utterance.onerror = () => {
            setSpeaking(false);
        };

        speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        speechSynthesis.cancel();
        setSpeaking(false);
    };

    useEffect(() => {
        return () => speechSynthesis.cancel();
    }, []);

    return {
        speaking,
        speak,
        stopSpeaking,
    };
}
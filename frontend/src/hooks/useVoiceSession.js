import { useCallback, useEffect, useState } from "react";

import api from "../services/api";

import useSpeechRecognition from "./useSpeechRecognition";
import useSpeechSynthesis from "./useSpeechSynthesis";

export default function useVoiceSession() {

    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState("idle");
    const [sessionId, setSessionId] = useState(null);

    const {
        transcript,
        listening,
        startListening,
        stopListening,
    } = useSpeechRecognition();

    const {
        speaking,
        speak,
        stopSpeaking,
    } = useSpeechSynthesis();

    const sendMessage = useCallback(async (message) => {

        if (!message.trim()) return;

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text: message,
            },
        ]);

        setStatus("processing");

        try {

            const res = await api.post("/chat", {

                message,

                session_id: sessionId,

            });

            setSessionId(res.data.session_id);

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: res.data.reply,
                },
            ]);

            setStatus("speaking");

            speak(res.data.reply, () => {

                setStatus("idle");

            });

        }
        catch (err) {

            console.error(err);

            setStatus("idle");

        }

    }, [sessionId, speak]);

    useEffect(() => {

        if (!transcript.trim()) return;

        sendMessage(transcript);

    }, [transcript, sendMessage]);

    const startSession = () => {

        stopSpeaking();

        setStatus("listening");

        startListening();

    };

    const stopSession = () => {

        stopListening();

        stopSpeaking();

        setStatus("idle");

    };

    return {

        messages,

        status,

        listening,

        speaking,

        startSession,

        stopSession,

    };

}
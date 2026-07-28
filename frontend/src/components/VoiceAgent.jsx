import { useCallback, useState } from "react";
import api from "../services/api";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import MicrophoneButton from "./MicrophoneButton";
import ChatWindow from "./ChatWindow";
import StatusBar from "./StatusBar";

function VoiceAgent() {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState("idle");
    const { speak } = useSpeechSynthesis();
    const sendMessage = useCallback(
        async (message) => {
            if (!message.trim()) return;
            setMessages((prev) => [
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
                });
                setMessages((prev) => [
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
            } catch (err) {
                console.error(err);
                setStatus("idle");
            }
        },
        [speak]
    );
    const { listening, startListening, stopListening} = useSpeechRecognition(sendMessage);
    return (
        <div className="voice-agent">
            <div className="header"> AI Voice Agent</div>
            <StatusBar status={listening ? "listening" : status}/>
            <ChatWindow messages={messages}/>
            <div className="footer">
                <MicrophoneButton listening={listening} onClick={listening ? stopListening : startListening}/>
            </div>
        </div>
    );
}
export default VoiceAgent;
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
    const [sessionId,setSessionId] = useState(null);
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
                    session_id: sessionId
                });
                setSessionId(res.data.session_id);
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
        [speak,sessionId]
    );
    const { listening, startListening, stopListening} = useSpeechRecognition(sendMessage);
    const handleMicClick = () => {
        if(speechSynthesis.speaking || speechSynthesis.pending){
            speechSynthesis.cancel();
            setStatus("idle");
        }
        if(listening) stopListening();
        else startListening();
    };
    return (
        <div className="voice-agent">
            <div className="header"> AI Voice Agent</div>
            <StatusBar status={listening ? "listening" : status}/>
            <ChatWindow messages={messages}/>
            <div className="footer">
                <MicrophoneButton listening={listening} onClick={handleMicClick}/>
            </div>
        </div>
    );
}
export default VoiceAgent;
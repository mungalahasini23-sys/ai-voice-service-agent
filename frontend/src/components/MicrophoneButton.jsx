import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

function MicrophoneButton({ listening, onClick }) {
    return (
        <button className={`mic-btn ${listening ? "listening" : "idle"}`} onClick={onClick}>
            {
                listening ? <FaMicrophoneSlash/> : <FaMicrophone/>
            }
        </button>
    );
}
export default MicrophoneButton;
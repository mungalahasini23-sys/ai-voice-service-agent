function StatusBar({ status }) {

    const text = {

        idle:"🟢 Ready",

        listening:"🎤 Listening...",

        processing:"🤔 Thinking...",

        speaking:"🔊 Speaking..."

    };

    return (

        <div className="status">

            {text[status]}

        </div>

    );

}

export default StatusBar;
function ChatBubble({ role, text }) {

    return (

        <div className={`bubble ${role}`}>

            <div className="sender">

                {

                    role==="user"

                    ? "👤 You"

                    : "🤖 Assistant"

                }

            </div>

            <div className="message">

                {text}

            </div>

        </div>

    );

}

export default ChatBubble;
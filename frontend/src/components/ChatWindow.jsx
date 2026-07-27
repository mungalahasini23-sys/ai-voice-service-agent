import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

function ChatWindow({ messages }) {

    const bottomRef = useRef(null);

    useEffect(()=>{

        bottomRef.current?.scrollIntoView({

            behavior:"smooth"

        });

    },[messages]);

    return(

        <div className="chat-window">

            {

                messages.map((message,index)=>(

                    <ChatBubble

                        key={index}

                        role={message.role}

                        text={message.text}

                    />

                ))

            }

            <div ref={bottomRef}></div>

        </div>

    );

}

export default ChatWindow;
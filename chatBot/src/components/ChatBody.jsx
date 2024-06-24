import React, {useEffect, useRef} from "react";
import autoAnimate from "@formkit/auto-animate";


const ChatBody = ({ chat }) => {
  const parent = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {

  }, [chat]);

  // // only for auto animations
  //  useEffect(() => {
  //    parent.current && autoAnimate(parent.current);
  //  }, [parent]);

  // for scrolling to bottom
  //  useEffect(() => {
  //    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //    console.log(chat);
  //  }, [chat]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chat.map((message, i) => {
        if(message.sender === "ai"){
          return (
            <div key={i} className="border-[#999999] break-words border-2 rounded-xl px-3 py-3 max-w-[80%] self-end">
              <pre className="whitespace-pre-wrap">
                <span>{message.message}</span>
              </pre>
              
            </div>
            
          );
        }else{
          return (
            <div key={i} className=" border-[#999999] break-words border-2 rounded-xl px-3 py-3 max-w-[80%] self-start">
              <pre className="whitespace-pre-wrap">
                <span>{message.message}</span>
              </pre>
              
            </div>
            
          );
        }
        
      })}
      
      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;


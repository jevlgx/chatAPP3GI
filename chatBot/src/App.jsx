import {useEffect, useState} from "react";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import axios from "axios";


function App() {
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            message: "Hello, I'm Copilot. How can I help you?",
        }
    ]);

    const generateAnswer = async (question) => {
        try {
            const apiKey = "AIzaSyBmvr56b2-sfsHHVS0yK68PhgyzF5lUtbQ";
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: question }] }],
                },

            });
            const answer = response.data.candidates[0].content.parts[0].text;
            const newMessage = {
                sender: "ai",
                message: answer
            };
            console.log(newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);




        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    useEffect(() => {console.log(messages);
    })


    const handleSend = async (message) => {
        // Ajouter le message utilisateur à l'état
        setMessages((prevMessages) => [...prevMessages, message]);

        // Appeler generateAnswer après la mise à jour de l'état
        setTimeout(async () => {
            await generateAnswer(message.message);
        }, 0);
    };

    return (
        <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between  align-middle">
            {/* gradients */}
            <div className="gradient-01 z-0 absolute"></div>
            <div className="gradient-02 z-0 absolute"></div>

            {/* header */}
            <div className="uppercase font-bold  text-2xl text-center mb-3">
                CHATBOT
            </div>

            {/* body */}
            <div
                className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md
      "
            >
                <ChatBody chat={messages} />
            </div>

            {/* input */}
            <div className="w-full max-w-4xl min-w-[20rem] self-center">
                <ChatInput sendMessage={handleSend}  />
            </div>
        </div>
    );
}

export default App;

/**
 *


function App() {
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            message: "Hello, I'm Gemini. How can I help you?",
        }
    ]);

    const [listMessages, setListMessages] =
        useState("user: tu est un agent d'une plate forme de gestion de voyage.t'on role " +
            "est de decrire a l'utilisateur le fonctionnement de la plateforme d'assistance " +
            "au deplacement.notre plateforme offre des services de location de vehicule, de publication " +
            "de deplacement ,de reservation de voyage. notre plate forme dispose de 2 agence de voyage " +
            "(general voyage et binam)"
        );


    const generateAnswer = async (question) => {
        try {
            const apiKey = "AIzaSyBmvr56b2-sfsHHVS0yK68PhgyzF5lUtbQ";
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
                method: "post",
                data: {
                    contents: [{parts: [{text: question}]}],
                },
            });
            console.log(response.data);
            const answer = response.data.candidates[0].content.parts[0].text;
            const newMessage = {
                sender: "ai",
                message: answer
            };
            console.log(newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            const newListMessage = "ai:" + answer;
            setListMessages(prevListMessages => prevListMessages + "\n" + newListMessage);

        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    useEffect(() => {
        console.log("update message : ", messages);
    }, [messages]);


    const handleSend = async (message) => {
        // Ajouter le message utilisateur à l'état
        console.log(messages);

        setMessages((prevMessages) => [...prevMessages, message]);

        setTimeout(() => {}, 1000);

        console.log(messages);

        const newMessage = "user:" + message.message;
        setListMessages(prevListMessages => prevListMessages + "\n" + newMessage);

        console.log(listMessages);

        // Appeler generateAnswer après la mise à jour de l'état
        setTimeout(async () => {
            await generateAnswer(listMessages);
        }, 0);
    };


    return (
        <div
            className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between  align-middle">

            <div className="gradient-01 z-0 absolute"></div>
            <div className="gradient-02 z-0 absolute"></div>


            <div className="uppercase font-bold  text-2xl text-center mb-3">
                YOWYOWBOT
            </div>


            <div
                className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md
      "
            >
                <ChatBody chat={messages}/>
            </div>


            <div className="w-full max-w-4xl min-w-[20rem] self-center">
                <ChatInput sendMessage={handleSend}/>
            </div>
        </div>
    );
}

export default App;

**/



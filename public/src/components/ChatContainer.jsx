import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {sendMessageRoute, recieveMessageRoute} from "../utils/APIRoutes";
import {Link} from "react-router-dom";


export default function ChatContainer({currentChat, socket}) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [chatBotList, setChatBotList] = useState([]);
    const [listen, setListen] = useState(false);
    const [botRes, setBotRes] = useState(false);

    useEffect(async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id,
        });
        setMessages(response.data);
    }, [currentChat]);

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            });
        }
    }, []);

    useEffect(async () => {
        if (arrivalMessage != null) {
            setMessages((prev) => [...prev, arrivalMessage]);
            if (listen) {
                handleAddMessageToListenList(arrivalMessage, false);
                if(botRes) {
                    await handleSendBotMsg();
                }
            }
        }
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,

        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };


    /**
     * Fonction appelée lorsqu'un message arrive et que resBot est true
     * @return {Promise<void>}
     */
    const handleSendBotMsg = async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        // Mettre ici la fonction pour générer le message du bot à partir de la liste des messages
        let botMessage = transformArrayToMessage(chatBotList);

        let botResponse = await generateAnswer(botMessage);


        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            msg: botMessage
        });

        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            botMessage,
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: botMessage});
        setMessages(msgs);
    };


    /**
     * Fonction pour transformer un message en objet pour ajouter à la liste
     * des objets que l'IA doit répondre
     * @param msg  message en question
     * @param isSender vaut true si le message est envoyé par le sender, false si non
     */
    const handleAddMessageToListenList = (msg, isSender) => {
        let msgs = [...chatBotList];
        let object = {
            sender: isSender ? "Message Emeteur" : "Message Récepteur",
            msg: msg
        }
        msgs.push(object);
        setChatBotList(msgs);
    };


    /**
     * Fonction à activer lorsqu'on clique sur le bouton listen ou off
     * @param value value === true si on appuie sur listen, value === false si appuie sur off
     */
    const handleListen = (value) => {
        setListen(value);
        if (!value) {
            setChatBotList([]);
            setBotRes(false);
        }
    };

    /**
     * Fonction à appeler lorsqu'on appuie sur " ON "
     * @param value le paramètre value est un booléen, true
     */
    const handleBotRes = (value) => {
        setBotRes(value);
    }

    /**
     * Fonction pour générer une réposne de la part de Gemini
     * @param question question posée par l'utilisateur
     * @return {Promise<*>} réponse de Gemini
     */
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

            return answer;
        }
        catch (error) {
            console.log(error);
            // Handle error
        }
    };

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt=""
                        />

                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`message ${
                                    message.fromSelf ? "sended" : "recieved"
                                }`}
                            >
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;

            .avatar {
                img {
                    height: 3rem;
                }
            }

            .username {
                h3 {
                    color: white;
                }
            }
        }
    }

    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 0.2rem;

            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .message {
            display: flex;
            align-items: center;

            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
                @media screen and (min-width: 720px) and (max-width: 1080px) {
                    max-width: 70%;
                }
            }
        }

        .sended {
            justify-content: flex-end;

            .content {
                background-color: #4f04ff21;
            }
        }

        .recieved {
            justify-content: flex-start;

            .content {
                background-color: #9900ff20;
            }
        }
    }
`;

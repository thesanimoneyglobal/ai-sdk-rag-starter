'use client';

import { useChat } from 'ai/react';
import { DynamicTextRenderer } from "@/components/textWrapper";
import { Bot, CornerDownLeft, Smile, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Instruction from "@/components/instruction";
import { useRef, useEffect } from 'react';
import {questions} from "@/components/questions";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, setMessages, setInput } = useChat({
        maxToolRoundtrips: 2,
        onResponse: () => {
            // Ensure the latest message is visible
            scrollToBottom();
        },
    });

    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    const onReset = () => {
        setMessages([]);
    };

    const scrollToBottom = () => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col w-full max-w-[768px] py-24 mx-auto stretch">
            {messages.length > 0 && (
                <Button
                    onClick={onReset}
                    className={'text-zinc-500 absolute top-5 right-10 hover:text-red-400'}
                    variant={'ghost'}
                >
                    Reset conversation<Trash className={'ml-2'}/>
                </Button>
            )}
            <div className="space-y-4">
                {messages.length > 0 ? (
                    messages.map((m) => (
                        <div key={m.id} className="whitespace-pre-wrap">
                            <div>
                                <h4 className="font-bold mb-1 flex gap-x-1 items-center">
                                    {m.role === 'assistant' ? (
                                        <div className={'rounded-full bg-blue-100 p-1'}>
                                            <Bot/>
                                        </div>
                                    ) : (
                                        <div className={'rounded-full bg-zinc-100 p-1'}>
                                            <Smile/>
                                        </div>
                                    )}
                                    {m.role[0].toUpperCase() + m.role.slice(1)}
                                </h4>
                                <div
                                    className={m.role === 'assistant' ? `text-sm text-gray-600 bg-blue-50 p-2 rounded-md` :
                                        'text-sm text-gray-600 bg-zinc-50 p-2 rounded-md'}>
                                    {m.content.length > 0 ? (
                                        <DynamicTextRenderer text={m.content}/>
                                    ) : (
                                        <span className="italic font-light">
                                            {'calling tool: ' + m?.toolInvocations?.[0]?.toolName}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Instruction/>
                )}
                <div ref={endOfMessagesRef}/>
            </div>

            <form onSubmit={handleSubmit}>
                <div
                    className="fixed text-zinc-500 text-sm bottom-0 w-full max-w-[768px] p-3 mb-8 border border-gray-300 rounded shadow-xl">
                    {messages.length <= 0 &&
                        <div className="text-xs w-full absolute flex justify-between -top-14 left-0">
                            {questions.map(({question}, index) =>
                                <Button type={'button'} className={'opacity-60 font-normal'} key={index} variant={'secondary'}
                                        onClick={() => setInput(question)}>{question}</Button>)}
                        </div>}
                    <input
                        className="w-[90%] p-1 rounded-md outline-none bg-transparent"
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />
                    <Button className="absolute right-2 top-2 text-zinc-500" size="sm" variant="ghost">
                        <CornerDownLeft/>
                    </Button>
                </div>
            </form>
        </div>
    );
}

'use client';

import { useChat } from 'ai/react';
import { DynamicTextRenderer } from "@/components/textWrapper";
import { Bot, CornerDownLeft, Smile, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <h4 className="font-bold flex gap-x-1">
                  {m.role} {m.role === 'assistant' ? <Bot /> : <Smile />}
                </h4>
                <div className="text-sm text-gray-600 bg-zinc-50 p-2 rounded-md">
                  {m.content.length > 0 ? (
                    <DynamicTextRenderer text={m.content} />
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
          <p>Instructions will be here</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="fixed text-zinc-500 text-sm bottom-0 w-full max-w-md p-3 mb-8 border border-gray-300 rounded shadow-xl">
          <input
            className="w-[90%] p-1 rounded-md"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button className="absolute right-2 top-2.5 text-zinc-500" size="sm" variant="ghost">
            <CornerDownLeft />
          </Button>
        </div>
      </form>
    </div>
  );
}

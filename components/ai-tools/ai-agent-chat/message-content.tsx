import React from "react";
import { ChatMessage } from "./types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import {
  TextPart,
  ToolInvocationPart,
  ReasoningPart,
  SourcePart,
} from "./message-parts";

interface MessageContentProps {
  message: ChatMessage;
}

export function MessageContent({ message }: MessageContentProps) {
  const renderPart = (part: any, idx: number) => {
    switch (part.type) {
      case "text":
        return <TextPart key={`text-${idx}`} part={part} />;
      case "tool-invocation":
        return <ToolInvocationPart key={`tool-${idx}`} part={part} />;
      case "reasoning":
        return <ReasoningPart key={`reasoning-${idx}`} part={part} />;
      case "source":
        return <SourcePart key={`source-${idx}`} part={part} />;
      default:
        return null;
    }
  };

  return (
    <div className="prose dark:prose-invert prose-sm max-w-none">
      {message.parts && Array.isArray(message.parts) ? (
        message.parts.map((part, idx) => renderPart(part, idx))
      ) : (
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {message.content}
        </Markdown>
      )}
    </div>
  );
}

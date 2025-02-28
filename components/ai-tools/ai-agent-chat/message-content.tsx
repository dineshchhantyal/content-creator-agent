import React, { memo } from "react";
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

// Use memo to prevent unnecessary re-renders
export const MessageContent = memo(function MessageContent({
  message,
}: MessageContentProps) {
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

  // Optimize the case where there are no parts
  if (
    !message.parts ||
    !Array.isArray(message.parts) ||
    message.parts.length === 0
  ) {
    return (
      <div className="prose dark:prose-invert prose-sm max-w-none">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {message.content}
        </Markdown>
      </div>
    );
  }

  return (
    <div className="prose dark:prose-invert prose-sm max-w-none">
      {message.parts.map((part, idx) => renderPart(part, idx))}
    </div>
  );
});

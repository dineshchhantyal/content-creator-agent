export interface MessagePart {
  type: string;
  text?: string;
  content?: string;
  reasoning?: string;
  toolInvocation?: {
    toolName?: string;
    state?: string;
    input?: any;
    result?: any;
  };
  [key: string]: any;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "system" | "user" | "data";
  content: string;
  parts?: MessagePart[];
}
export interface ExtendedChatMessage extends ChatMessage {
  originalContent?: string;
  isTruncated?: boolean;
}

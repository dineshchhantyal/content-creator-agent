export interface MessagePart {
  type: string;
  text?: string;
  content?: string;
  reasoning?: string;
  toolInvocation?: {
    toolName?: string;
    state?: string;
  };
  [key: string]: any;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "system" | "user" | "data";
  content: string;
  parts?: MessagePart[];
}

export interface ToolInvocation {
  toolName?: string;
  state?: string;
  input?: Record<string, unknown>;
  result?: Record<string, unknown>;
}

export interface MessagePart {
  type: string;
  text?: string;
  content?: string;
  reasoning?: string;
  toolInvocation?: ToolInvocation;
  [key: string]: unknown;
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

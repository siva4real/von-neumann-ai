import { NextResponse } from "next/server";

type ClientMessage = {
  role: "user" | "agent";
  content: string;
};

type ChatRequest = {
  projectName?: string;
  messages?: ClientMessage[];
};

const OPENROUTER_MODEL = "xiaomi/mimo-v2.5";

function toOpenRouterMessages(body: ChatRequest) {
  const projectName = body.projectName?.trim() || "this social media project";
  const history = (body.messages ?? [])
    .filter((m) => m.content?.trim())
    .slice(-20)
    .map((m) => ({
      role: m.role === "agent" ? "assistant" : "user",
      content: m.content.trim(),
    }));

  return [
    {
      role: "system",
      content:
        `You are the social media operator for ${projectName}. ` +
        "Be practical and concise. Help plan posts, write copy, analyze performance, and suggest next actions. " +
        "Do not claim that you scheduled, published, or edited assets unless the user explicitly asks for a draft or plan.",
    },
    ...history,
  ];
}

function extractText(content: unknown) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (
          part &&
          typeof part === "object" &&
          "text" in part &&
          typeof part.text === "string"
        ) {
          return part.text;
        }
        return "";
      })
      .join("")
      .trim();
  }
  return "";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENROUTER_API_KEY in the server environment." },
      { status: 500 }
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = toOpenRouterMessages(body);
  if (messages.length < 2) {
    return NextResponse.json({ error: "Message history is empty." }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "von Neumann Social Dashboard",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 900,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      payload.error &&
      typeof payload.error === "object" &&
      "message" in payload.error &&
      typeof payload.error.message === "string"
        ? payload.error.message
        : `OpenRouter request failed with status ${response.status}.`;

    return NextResponse.json({ error: message }, { status: response.status });
  }

  const content = extractText(payload?.choices?.[0]?.message?.content);
  if (!content) {
    return NextResponse.json(
      { error: "OpenRouter returned an empty response." },
      { status: 502 }
    );
  }

  return NextResponse.json({ content, model: OPENROUTER_MODEL });
}

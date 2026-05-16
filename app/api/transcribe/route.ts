import { NextRequest, NextResponse } from "next/server";

const LANG_MAP: Record<string, string> = {
  english: "en",
  yoruba:  "yo",
  igbo:    "ig",
  hausa:   "ha",
  pidgin:  "en", // Nigerian Pidgin is English-based; Whisper handles it best under "en"
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file     = formData.get("file")     as File   | null;
  const language = formData.get("language") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const groqForm = new FormData();
  groqForm.append("file",  file);
  groqForm.append("model", "whisper-large-v3");

  const langCode = LANG_MAP[language ?? "english"];
  if (langCode) groqForm.append("language", langCode);

  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method:  "POST",
    headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body:    groqForm,
  });

  if (!res.ok) {
    console.error("Groq error:", await res.text());
    return NextResponse.json({ transcript: "" });
  }

  const data = await res.json();
  return NextResponse.json({ transcript: (data.text as string) ?? "" });
}

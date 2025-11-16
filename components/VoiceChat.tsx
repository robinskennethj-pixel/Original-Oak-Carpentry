"use client";

import React, { useState, useRef } from "react";

export default function VoiceChat({ agent = "support", baseUrl = "" }: { agent?: string, baseUrl?: string }) {
  const [recording, setRecording] = useState(false);
  const [messages, setMessages] = useState<{who:'user'|'agent', text:string}[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const endpoint = baseUrl || (typeof window !== 'undefined' ? `${window.location.origin.replace(/:\d+$/, ':4111')}` : 'http://localhost:4111');

  async function startRecording() {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;
    audioChunksRef.current = [];
    mr.ondataavailable = (e) => audioChunksRef.current.push(e.data);
    mr.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      // send to agent service STT endpoint
      const resp = await fetch(`${endpoint}/voice/stt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent, audio_b64: base64, mime: "audio/webm" })
      });
      const data = await resp.json();
      const transcript = data.transcript || data.text || "I couldn't hear that.";
      setMessages(m => [...m, { who:'user', text: transcript }]);
      // forward transcript to agent chat
      const agentResp = await fetch(`${endpoint}/chat`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ agent, message: transcript })
      });
      const agentJson = await agentResp.json();
      const agentText = agentJson?.result?.raw || JSON.stringify(agentJson?.result) || agentJson?.text || '...';
      setMessages(m=>[...m, { who:'agent', text: agentText }]);
      // request TTS for the agent reply
      const ttsResp = await fetch(`${endpoint}/voice/tts`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ agent, text: agentText })
      });
      const ttsBlob = await ttsResp.blob();
      const url = URL.createObjectURL(ttsBlob);
      const audio = new Audio(url);
      audio.play();
    };
    mr.start();
  }

  function stopRecording() {
    setRecording(false);
    mediaRecorderRef.current?.stop();
    (mediaRecorderRef.current?.stream.getTracks() || []).forEach(t => t.stop());
  }

  return (
    <div style={{ width:360, border:'1px solid #ddd', padding:12, borderRadius:8, background:'#fff' }}>
      <div style={{ height:240, overflowY:'auto', marginBottom:8 }}>
        {messages.map((m,i)=>(
          <div key={i} style={{ textAlign: m.who==='user' ? 'right' : 'left', marginBottom:8 }}>
            <div style={{ display:'inline-block', padding:8, borderRadius:6, background: m.who==='user' ? '#e6f7ff' : '#fafafa' }}>
              <pre style={{ margin:0, whiteSpace:'pre-wrap' }}>{m.text}</pre>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <button onMouseDown={startRecording} onMouseUp={stopRecording} onTouchStart={startRecording} onTouchEnd={stopRecording}
          style={{ padding:8 }}>
          {recording ? "Recording… (release to send)" : "Push to Talk"}
        </button>
        <button onClick={() => { setMessages([]); }}>Clear</button>
      </div>
    </div>
  );
}

import { ofetch } from "ofetch";

// ⚠️ 这里填你的API Key
//这是deepseek的密钥
// const API_KEY = "sk-1543af2e5a244be092699bf0410f80c2";
const API_KEY = import.meta.env.VITE_SILICON_API_KEY;
console.log("API Key exists:", !!API_KEY); // 输出 true 或 false
console.log("API Key prefix:", API_KEY?.substring(0, 5)); // 输出 'sf-' 确认格式

export const fetchChatStream = async (messages, onMessage) => {
  try {
    await ofetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: {
        model: "deepseek-ai/DeepSeek-V3",
        messages,
        stream: true,
      },
      responseType: "stream",
      onResponse(context) {
        const reader = context.response.body.getReader();
        const decoder = new TextDecoder();

        const read = async () => {
          const { done, value } = await reader.read();
          if (done) return;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && line !== "data: [DONE]") {
              try {
                const data = JSON.parse(line.slice(6));
                const content = data.choices[0]?.delta?.content || "";
                onMessage(content);
              } catch (e) {}
            }
          }
          read();
        };
        read();
      },
    });
  } catch (error) {
    console.error("Stream error:", error);
    throw error;
  }
};

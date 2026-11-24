
import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

interface ContactPayload {
  email: string;
  message: string;
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "";

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN || origin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
}

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers["origin"] ?? "";
  const headers = corsHeaders(origin);

  if (ALLOWED_ORIGIN && origin && origin !== ALLOWED_ORIGIN) {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ error: "Origem não permitida." })
    };
  }

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Método não permitido." })
    };
  }

  let payload: ContactPayload;

  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Dados inválidos." })
    };
  }

  const email =
    typeof payload?.email === "string" ? payload.email.trim() : "";

  const message =
    typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!email || !message) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({
        error: "Preencha o e-mail e a mensagem."
      })
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email) || email.length > 254) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: "E-mail inválido." })
    };
  }

  if (message.length > 3000) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: "Mensagem muito longa." })
    };
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_EMAIL
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        error: "Serviço de e-mail não configurado."
      })
    };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      replyTo: email,
      to: CONTACT_EMAIL,
      subject: "[Alkin Move] Nova solicitação de aula",
      text: `E-mail: ${email}\n\nMensagem:\n${message}`
    });

    // Com Ethereal o e-mail não chega na caixa real: veja-o por este link
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("Pré-visualização (Ethereal):", previewUrl);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Mensagem enviada com sucesso."
      })
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Não foi possível enviar a mensagem."
      })
    };
  }
};

export { handler };

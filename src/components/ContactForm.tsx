
import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          message
        })
      });

      const responseText = await response.text();

      let result: { error?: string; message?: string } = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error("O servidor retornou uma resposta inválida.");
        }
      }

      if (!response.ok) {
        throw new Error(
          result.error ?? `Erro ao enviar mensagem (${response.status}).`
        );
      }

      if (!result.message) {
        throw new Error("O servidor não confirmou o envio da mensagem.");
      }

      setStatus("Mensagem enviada com sucesso!");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-email">Seu e-mail</label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@exemplo.com"
          maxLength={254}
          required
        />
      </div>

      <div>
        <label htmlFor="contact-message">Sua mensagem</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Conte seu interesse em uma aula experimental"
          rows={5}
          maxLength={3000}
          required
        />
      </div>

      <button
        className="btn-primary"
        type="submit"
        disabled={sending}
      >
        {sending ? "Enviando..." : "Enviar mensagem"}
      </button>

      <p role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

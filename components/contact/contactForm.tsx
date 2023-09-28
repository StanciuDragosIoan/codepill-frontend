import { UserContext } from "@/context/user";
import Image from "next/image";
import { useContext, useState } from "react";
import classes from "./contactForm.module.css";

async function sendData(contactDetails: {
  email: string;
  name: string;
  message: string;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  await res.json();

  if (!res.ok) {
    throw new Error("something went wrong");
  }
}

function ContactForm() {
  const { theme } = useContext(UserContext);

  const [enteredEmail, setEmail] = useState("");
  const [enteredName, setName] = useState("");
  const [enteredMessage, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requestStatus, setRequestStatus] = useState(); //pending/success/failure

  async function sendMessage(event: React.MouseEvent<HTMLButtonElement>) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(enteredEmail);
    event.preventDefault();
    if (isValidEmail && enteredEmail && enteredName && enteredMessage) {
      try {
        await sendData({
          email: enteredEmail,
          name: enteredName,
          message: enteredMessage,
        });
        setEmail("");
        setMessage("");
        setName("");
      } catch (err) {}
    } else {
      setError("Please check your inputs and try again!");

      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  return (
    <section className={classes.contact}>
      <div
        className={
          theme === "dark" ? classes.contactDark : classes.contactLight
        }
      >
        <h1>How can I help you?</h1>

        <form className={classes.form}>
          <p className="text-red-400 text-center">{error}</p>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={enteredEmail}
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className={classes.control}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={enteredName}
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={enteredMessage}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>

          <div className={classes.actions}>
            <button onClick={sendMessage}>Send Message</button>
          </div>
        </form>
      </div>

      <Image
        className={classes.img}
        src="/assets/img/mail.svg"
        alt="contact us"
        width={600}
        height={300}
        priority
      />
    </section>
  );
}

export default ContactForm;

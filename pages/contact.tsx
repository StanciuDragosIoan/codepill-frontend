import ContactForm from "@/components/contact/contactForm";
export default function ContactPage() {
  return (
    <>
      <ContactForm />
    </>
  );
}

export function getServerSideProps(ctx: any) {
  const { codePillTheme } = ctx.req.cookies;

  return {
    props: {
      theme: codePillTheme || "dark",
    },
  };
}

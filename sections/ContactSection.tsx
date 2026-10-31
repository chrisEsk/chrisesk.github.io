import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";

import LinkButton from "@/components/LinkButton";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import { CONTACT_EMAIL } from "utils/site";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for contact section
  const contactSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    contactSection && onSectionChange!("contact");
  }, [contactSection]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section min-h-[500px] text-center"
    >
      <div className="text-center">
        <RoughNotation
          type="underline"
          color="#387BF8"
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="text-2xl inline-block my-6 font-medium">Contact</h2>
        </RoughNotation>
      </div>
      <div className="mt-8 mb-12">
        <h3 className="font-medium text-lg mb-2 md:text-3xl" ref={elementRef}>
          Let's be awesome together!
        </h3>
        <p className="mb-6 mx-auto max-w-lg md:mb-10 lg:leading-loose">
          As a dev, I am driven by my love for coding and my desire for new
          challenges. If you have opportunities for collaboration or want to
          build something amazing, don't hesitate to contact me!
        </p>
        <LinkButton href={`mailto:${CONTACT_EMAIL}`}>Get in touch!</LinkButton>
      </div>
    </section>
  );
};

export default ContactSection;

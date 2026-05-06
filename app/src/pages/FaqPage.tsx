import { MixedHeading } from "@/components/ui/MixedHeading";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "When will my order be shipped?",
    a: "Your order will be shipped within two business days.",
  },
  {
    q: "Where can I find my tracking number?",
    a: "You will automatically receive the tracking number by email 1–3 working days after placing your order.",
  },
  {
    q: "How long does delivery take?",
    a: "Several factors affect shipping time: when the order was placed, which country we ship to, what was ordered, and the shipping option selected. Your order is shipped directly from the manufacturer. The selected shipping option will also affect delivery time.",
  },
  {
    q: "How do I reach support?",
    a: "Simply send an email to blessingsells@gmail.com. Our support team is available Monday – Friday: 6:00 am – 6:00 pm.",
  },
  {
    q: "Can I change or cancel my order afterwards?",
    a: "It is possible to make subsequent changes to the order within 24 hours — just write to our support. We can change shipping information, your first and last name, email address, and phone number. For cancellations, please contact us within 24 hours of placing your order. We cannot cancel an order that is already in transit.",
  },
  {
    q: "Why should I order from you?",
    a: "Our products are listed from trusted manufacturers.",
  },
  {
    q: "What happens if the product arrives damaged?",
    a: "If the product is damaged, you should report the damage to us within 14 days of ordering. Within that period, we will bear the cost of the new product. Please send us your order number and a photo of the damaged product. We ask you to report the damage within 24 hours after delivery of your order — otherwise we cannot consider the complaint.",
  },
  {
    q: "Which payment methods are supported?",
    a: "We accept: Credit Cards (VISA, Mastercard, American Express), PayPal, Apple Pay, Google Pay, Amazon, Diners Club, Discover, and Facebook Pay.",
  },
];


export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-[760px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <MixedHeading className="text-[32px] md:text-[40px] mb-4">
        Frequently Asked{" "}
        <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
          Questions
        </em>
      </MixedHeading>
      <p className="mb-12" style={{ color: "var(--muted-foreground)" }}>
        Can't find your answer? Email us at{" "}
        <a
          href="mailto:blessingsells@gmail.com"
          style={{ color: "var(--primary)", textDecoration: "underline" }}
        >
          blessingsells@gmail.com
        </a>{" "}or call{" "}
        <a
          href="tel:+12176954009"
          style={{ color: "var(--primary)", textDecoration: "underline" }}
        >
          +1 (217) 695-4009
        </a>
      </p>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors"
              style={{
                background: open === idx ? "var(--card)" : "#fff",
              }}
            >
              <span className="font-medium text-[15px] pr-4">{faq.q}</span>
              <ChevronDown
                className="w-5 h-5 flex-shrink-0 transition-transform"
                style={{
                  color: "var(--muted-foreground)",
                  transform: open === idx ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {open === idx && (
              <div
                className="px-5 pb-5 text-[14px] leading-[1.7]"
                style={{ color: "var(--muted-foreground)" }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

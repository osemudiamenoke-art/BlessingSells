import { MixedHeading } from "@/components/ui/MixedHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return. Shipping costs for returns are the responsibility of the customer unless the item is defective."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options are available at checkout. Orders placed before 2PM EST generally ship the same day."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within the United States and Canada. We are working on expanding our international shipping options in the near future."
  },
  {
    question: "Are your E-Bikes fully assembled?",
    answer: "Our E-Bikes require minimal assembly upon arrival. We provide detailed instructions and all necessary tools. Most customers complete the assembly in under 30 minutes. We also offer a premium delivery service that includes full assembly for an additional fee."
  },
  {
    question: "What kind of warranty do you offer?",
    answer: "All our products come with a minimum 1-year manufacturer's warranty against defects. E-Bikes and Smart Home products typically include a 2-year warranty. Extended warranty options are available at checkout."
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ" }
        ]} 
      />

      <div className="mt-8 mb-12 text-center">
        <MixedHeading className="text-[36px] md:text-[48px] mb-4">
          Frequently <em className="font-serif italic font-normal">Asked</em> Questions
        </MixedHeading>
        <p className="text-muted-foreground">Find answers to common questions about our products and services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border border-border rounded-[2px] bg-card overflow-hidden">
              <button 
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-card/80 transition-colors"
              >
                <span className="font-medium text-[15px]">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-[14px] text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 p-8 bg-card border border-border text-center rounded-[2px]">
        <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
        <p className="text-[14px] text-muted-foreground mb-6">Our customer support team is here to help.</p>
        <a 
          href="/pages/contact"
          className="inline-flex items-center justify-center h-10 px-6 bg-foreground text-background text-[12px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

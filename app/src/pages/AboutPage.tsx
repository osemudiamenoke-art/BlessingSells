import { MixedHeading } from "@/components/ui/MixedHeading";
import { Link } from "wouter";
import { Heart, Globe, Shield, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <MixedHeading className="text-[32px] md:text-[40px] mb-4">
        About{" "}
        <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
          BlessingSells
        </em>
      </MixedHeading>
      <p
        className="text-[16px] leading-[1.8] mb-12"
        style={{ color: "var(--muted-foreground)" }}
      >
        BlessingSells is an e-commerce destination that connects everyday
        shoppers with a curated selection of quality, affordable products — from
        e-bikes and smart watches to beauty essentials and baby care. Our mission
        is to make great products accessible to everyone, so you can live the
        life you deserve without breaking the bank.
      </p>

      {/* What does BlessingSells mean? */}
      <div
        className="p-6 md:p-8 rounded-lg mb-10"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-[20px] md:text-[24px] font-medium mb-3">
          What does BlessingSells mean?
        </h2>
        <p
          className="text-[18px] font-medium mb-3"
          style={{ color: "var(--primary)" }}
        >
          BlessingSells — Shop Smart, Live Well.
        </p>
        <p
          className="text-[15px] leading-[1.8]"
          style={{ color: "var(--muted-foreground)" }}
        >
          We believe every purchase should feel like a blessing. Enjoy quality
          products at honest prices across all of our collections.
        </p>
      </div>

      {/* Where are products shipped from? */}
      <div className="mb-12">
        <h2 className="text-[20px] md:text-[24px] font-medium mb-4">
          Where are products shipped from?
        </h2>
        <p
          className="text-[15px] leading-[1.8]"
          style={{ color: "var(--muted-foreground)" }}
        >
          Products on BlessingSells are shipped through experienced and reliable
          logistics partners. Shipping origins may vary depending on the product
          purchased.
        </p>
      </div>

      {/* Our Strengths */}
      <div className="mb-12">
        <h2 className="text-[20px] md:text-[24px] font-medium mb-6">
          Our Strengths
        </h2>
        <p
          className="text-[15px] leading-[1.8] mb-6"
          style={{ color: "var(--muted-foreground)" }}
        >
          BlessingSells brings a curated network of merchandise partners,
          manufacturers, and brands of all sizes directly to your doorstep
          because of our:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Wide Selection",
              desc: "Quality products across multiple categories — e-bikes, watches, beauty, baby care, wallets, and more.",
            },
            {
              title: "Reliable Logistics",
              desc: "Experienced shipping partners to ensure your orders arrive safely and on time.",
            },
            {
              title: "Affordable Pricing",
              desc: "Great products at honest prices — no compromises on quality.",
            },
            {
              title: "Trusted Partnerships",
              desc: "Direct-to-consumer relationships with reputable manufacturers and brands.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-lg"
              style={{
                border: "1px solid var(--border)",
                background: "var(--background)",
              }}
            >
              <h3 className="text-[15px] font-medium mb-2">{item.title}</h3>
              <p
                className="text-[13px] leading-[1.7]"
                style={{ color: "var(--muted-foreground)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-12">
        <h2 className="text-[20px] md:text-[24px] font-medium mb-6">
          Our Values
        </h2>
        <div className="space-y-5">
          {[
            {
              icon: Sparkles,
              title: "Empowerment",
              desc: "Everyone deserves access to products that improve their daily life.",
            },
            {
              icon: Globe,
              title: "Inclusion & Diversity",
              desc: "We respect and embrace differences across all communities.",
            },
            {
              icon: Shield,
              title: "Integrity",
              desc: "Honest, ethical, and trustworthy in everything we do.",
            },
            {
              icon: Heart,
              title: "Social Responsibility",
              desc: "Committed to doing good for the world around us.",
            },
          ].map((value) => (
            <div key={value.title} className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <value.icon
                  className="w-[18px] h-[18px]"
                  strokeWidth={1.5}
                  style={{ color: "var(--primary)" }}
                />
              </div>
              <div>
                <h3 className="text-[15px] font-medium mb-1">{value.title}</h3>
                <p
                  className="text-[14px] leading-[1.7]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="text-center p-8 md:p-10 rounded-lg"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <p className="text-[15px] mb-4" style={{ color: "var(--muted-foreground)" }}>
          Have a question or want to get in touch?
        </p>
        <Link
          href="/pages/contact"
          className="inline-block px-6 py-3 text-[14px] font-medium rounded-full transition-opacity hover:opacity-90"
          style={{
            background: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

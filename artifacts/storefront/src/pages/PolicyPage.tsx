import { useParams } from "wouter";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function PolicyPage() {
  const { policy } = useParams<{ policy: string }>();

  const titleMap: Record<string, { plain: string, italic: string }> = {
    "shipping-policy": { plain: "Shipping", italic: "Policy" },
    "refund-policy": { plain: "Refund", italic: "Policy" },
    "privacy-policy": { plain: "Privacy", italic: "Policy" },
    "terms-of-service": { plain: "Terms of", italic: "Service" },
    "contact": { plain: "Contact", italic: "Us" },
    "about": { plain: "Our", italic: "Story" },
  };

  const policyContent = titleMap[policy || ""] || { plain: "Store", italic: "Policy" };
  const fullTitle = `${policyContent.plain} ${policyContent.italic}`;

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: fullTitle }
        ]} 
      />

      <div className="mt-8 mb-12 border-b border-border pb-8">
        <MixedHeading className="text-[36px] md:text-[48px]">
          {policyContent.plain} <em className="font-serif italic font-normal">{policyContent.italic}</em>
        </MixedHeading>
      </div>

      <div className="prose prose-neutral max-w-none text-foreground/80 leading-relaxed font-sans font-light">
        <p>This is a placeholder for the {fullTitle}. In a production environment, this content would be fetched from Shopify's pages API or a CMS.</p>
        
        {policy === 'contact' ? (
          <div className="mt-8 p-8 bg-card rounded-[2px] border border-border">
            <h3 className="text-lg font-medium text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-4 text-[14px]">
              <p><strong>Email:</strong> blessingsells@gmail.com</p>
              <p><strong>Phone:</strong> +1 (217) 695-4009</p>
              <p><strong>Address:</strong> 824 N 7th Street, Quincy, IL 62301</p>
            </div>
          </div>
        ) : (
          <>
            <h3>1. Introduction</h3>
            <p>Welcome to BlessingSells. These terms govern your use of our website and services. By accessing our site, you agree to these terms in full.</p>
            
            <h3>2. Information We Collect</h3>
            <p>We collect information to provide better services to our users. We respect your privacy and handle your data with care.</p>
            
            <h3>3. How We Use Your Information</h3>
            <p>Your information is used to process orders, communicate with you, and improve our store experience. We do not sell your personal data to third parties.</p>
            
            <h3>4. Contact Information</h3>
            <p>If you have any questions about this policy, please contact us at blessingsells@gmail.com.</p>
          </>
        )}
      </div>
    </div>
  );
}

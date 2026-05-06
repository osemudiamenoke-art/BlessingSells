import { useParams } from "wouter";

const POLICIES: Record<string, { title: string; content: string }> = {
  "shipping-policy": {
    title: "Shipping Policy",
    content: `
      <p>This document sets out the shipping policy that applies to customers that make a purchase at <strong>www.blessingsell.com</strong>. If you have any questions, please contact our customer service team on <a href="tel:+12176954009">+1 (217) 695-4009</a> or <a href="mailto:blessingoboh88@gmail.com">blessingoboh88@gmail.com</a>.</p>

      <h2>Shipping Options &amp; Delivery Costs</h2>
      <p>We offer the following shipping options — you will be asked to select a shipping method at checkout.</p>

      <h2>Order Processing Time</h2>
      <p>All orders placed and shipping policies are handled by shopify.com. We do not have autonomy over goods sold on this website.</p>

      <h2>Delivery Address &amp; P.O. Boxes</h2>
      <p>Please note that we are unable to modify the delivery address once you have placed your order. We are sorry but we do not ship to P.O. boxes.</p>

      <h2>International Orders</h2>
      <p>Your package may be subject to import duties and taxes. You, as the customer, are responsible for paying those fees. We recommend that you check with your local customs office before placing an order on our website as these fees can sometimes be significant and we are unable to calculate these for you.</p>

      <h2>Tracking Your Order</h2>
      <p>Once your order has been dispatched, we will send you a confirmation email with tracking information. You will be able to track your package directly on the carrier's website.</p>

      <h2>Returns, Refunds, and Exchanges</h2>
      <p>We want you to be completely happy with your purchase — please read our return &amp; refund policy for detailed information about our processes.</p>
    `,
  },

  "refund-policy": {
    title: "Refund Policy",
    content: `
      <p>We have a <strong>30-day return policy</strong>, which means you have 30 days after receiving your item to request a return.</p>

      <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.</p>

      <p>To start a return, you can contact us at <a href="mailto:blessingsells@gmail.com">blessingsells@gmail.com</a>. If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>

      <p>You can always contact us for any return question at <a href="mailto:blessingsells@gmail.com">blessingsells@gmail.com</a>.</p>

      <h2>Damages and Issues</h2>
      <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

      <h2>Exceptions / Non-Returnable Items</h2>
      <p>Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.</p>
      <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>

      <h2>Exchanges</h2>
      <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>

      <h2>Refunds</h2>
      <p>We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
    `,
  },

  "privacy-policy": {
    title: "Privacy Policy",
    content: `
      <p>This Privacy Policy describes how <strong>www.blessingsells.com</strong> (the "Site" or "we") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.</p>

      <h2>Collecting Personal Information</h2>
      <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as "Personal Information".</p>

      <h3>Device information</h3>
      <p>Examples of Personal Information collected: version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site. Purpose of collection: to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site. Source of collection: Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels. Disclosure for a business purpose: shared with our processor Shopify.</p>

      <h3>Order information</h3>
      <p>Examples of Personal Information collected: name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. Purpose of collection: to provide products or services to you, fulfill our contract, process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations. Disclosure for a business purpose: shared with our processor Shopify.</p>

      <h2>Sharing Personal Information</h2>
      <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you. We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here: <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noreferrer">https://www.shopify.com/legal/privacy</a>.</p>

      <h2>Behavioural Advertising</h2>
      <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. You can opt out of targeted advertising by visiting the Digital Advertising Alliance's opt-out portal at: <a href="http://optout.aboutads.info/" target="_blank" rel="noreferrer">http://optout.aboutads.info/</a>.</p>

      <h2>Cookies</h2>
      <p>A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences.</p>

      <h2>Do Not Track</h2>
      <p>Please note that because there is no consistent industry understanding of how to respond to "Do Not Track" signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.</p>

      <h2>Changes</h2>
      <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>

      <h2>Contact</h2>
      <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us:</p>
      <p>
        <strong>Address:</strong> 824 N 7th Street, Quincy, IL 62301, United States<br/>
        <strong>Email:</strong> <a href="mailto:customercare@blessingsells.com">customercare@blessingsells.com</a><br/>
        <strong>Hotline:</strong> <a href="tel:+12176954009">+1 (217) 695-4009</a><br/>
        <strong>Website:</strong> <a href="https://www.blessingsells.com" target="_blank" rel="noreferrer">www.blessingsells.com</a>
      </p>
      <p><em>Last updated: April 2022</em></p>
    `,
  },

  "terms-of-service": {
    title: "Terms of Service",
    content: `
      <h2>Overview</h2>
      <p>This website is operated by <strong>Blessingsells</strong>. Throughout the site, the terms "we", "us" and "our" refer to Blessingsells. Blessingsells offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
      <p>By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"). Please read these Terms of Service carefully before accessing or using our website.</p>

      <h2>Section 1 – Online Store Terms</h2>
      <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>

      <h2>Section 2 – General Conditions</h2>
      <p>We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission by us.</p>

      <h2>Section 3 – Accuracy, Completeness and Timeliness of Information</h2>
      <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions.</p>

      <h2>Section 4 – Modifications to the Service and Prices</h2>
      <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice at any time.</p>

      <h2>Section 5 – Products or Services</h2>
      <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>

      <h2>Section 6 – Accuracy of Billing and Account Information</h2>
      <p>We reserve the right to refuse any order you place with us. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.</p>

      <h2>Section 7 – Optional Tools</h2>
      <p>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. Any use by you of optional tools offered through the site is entirely at your own risk.</p>

      <h2>Section 8 – Third-Party Links</h2>
      <p>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy of those sites.</p>

      <h2>Section 9 – User Comments, Feedback and Other Submissions</h2>
      <p>If you send certain specific submissions or creative ideas, suggestions, proposals, plans, or other materials, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us.</p>

      <h2>Section 10 – Personal Information</h2>
      <p>Your submission of personal information through the store is governed by our Privacy Policy.</p>

      <h2>Section 11 – Errors, Inaccuracies and Omissions</h2>
      <p>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information at any time without prior notice.</p>

      <h2>Section 12 – Prohibited Uses</h2>
      <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code.</p>

      <h2>Section 13 – Disclaimer of Warranties; Limitation of Liability</h2>
      <p>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. In no case shall Blessingsells, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.</p>

      <h2>Section 14 – Indemnification</h2>
      <p>You agree to indemnify, defend and hold harmless Blessingsells and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service.</p>

      <h2>Section 15 – Severability</h2>
      <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law.</p>

      <h2>Section 16 – Termination</h2>
      <p>These Terms of Service are effective unless and until terminated by either you or us. If in our sole judgment you fail to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice.</p>

      <h2>Section 17 – Entire Agreement</h2>
      <p>These Terms of Service and any policies or operating rules posted by us on this site constitute the entire agreement and understanding between you and us and govern your use of the Service.</p>

      <h2>Section 18 – Governing Law</h2>
      <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the United States.</p>

      <h2>Section 19 – Changes to Terms of Service</h2>
      <p>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.</p>

      <h2>Section 20 – Contact Information</h2>
      <p>Questions about the Terms of Service should be sent to us at <a href="mailto:blessingsells@gmail.com">blessingsells@gmail.com</a>.</p>
    `,
  },

  contact: {
    title: "Contact Us",
    content: `
      <p>We'd love to hear from you! Reach us through any of the channels below.</p>
      <h2>Email</h2>
      <p><a href="mailto:customercare@blessingsells.com">customercare@blessingsells.com</a></p>
      <h2>Phone</h2>
      <p><a href="tel:+12176954009">+1 (217) 695-4009</a></p>
      <h2>Address</h2>
      <p>824 N 7th Street, Quincy, IL 62301, United States</p>
      <h2>Website</h2>
      <p><a href="https://www.blessingsells.com" target="_blank" rel="noreferrer">www.blessingsells.com</a></p>
      <h2>Hours</h2>
      <p>Monday–Friday, 6:00 am – 6:00 pm</p>
    `,
  },
};

export default function PolicyPage() {
  const { policy } = useParams<{ policy: string }>();
  const page = POLICIES[policy || ""] ?? {
    title: policy?.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Page",
    content: "<p>Content coming soon.</p>",
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <h1 className="text-[32px] md:text-[40px] font-medium mb-10">{page.title}</h1>
      <div
        className="prose-content text-[15px] leading-[1.75]"
        style={{ color: "var(--foreground)" }}
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
      <style>{`
        .prose-content h2 { font-size: 18px; font-weight: 600; margin: 2.25rem 0 0.75rem; color: var(--foreground); }
        .prose-content h3 { font-size: 15px; font-weight: 600; margin: 1.5rem 0 0.5rem; color: var(--foreground); }
        .prose-content p  { margin-bottom: 1rem; color: rgba(26,26,26,0.8); }
        .prose-content a  { color: var(--primary); text-decoration: underline; }
        .prose-content a:hover { opacity: 0.75; }
      `}</style>
    </div>
  );
}

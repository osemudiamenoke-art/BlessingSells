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

      <p>To start a return, you can contact us at <a href="mailto:info@blessingsells.org">info@blessingsells.org</a>.</p>

      <p>If your return is accepted, we'll send you a return shipping label, as well as instructions on return address. Items sent back to us without first requesting a return will not be accepted.</p>

      <p>You can reach us for any return question at <a href="mailto:info@blessingsells.org">info@blessingsells.org</a>.</p>

      <h2>Damages and Issues</h2>
      <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue making a refund or deliver a new product.</p>

      <h2>Exceptions / Non-Returnable Items</h2>
      <p>Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.</p>
      <p>No returns on sales items or gift cards, except damage.</p>

      <h2>Exchanges</h2>
      <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>

      <h2>Refunds</h2>
      <p>We will notify you once your return is issue a shipping label, refund will be issue depending on your means of payment or banking institution refund normal arrive within five business days. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund.</p>
    `,
  },

  "privacy-policy": {
    title: "Privacy Policy",
    content: `
      <p>This Privacy Policy describes how <strong>www.blessingsells.com</strong> (the "Site" or "we") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.</p>

      <h2>Collecting Personal Information</h2>
      <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as "Personal Information". See the list below for more information about what Personal Information we collect and why.</p>

      <h3>Device information</h3>
      <p><strong>Examples of Personal Information collected:</strong> version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.</p>
      <p><strong>Purpose of collection:</strong> to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.</p>
      <p><strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.</p>
      <p><strong>Disclosure for a business purpose:</strong> shared with our processor Shopify.</p>

      <h3>Order information</h3>
      <p><strong>Examples of Personal Information collected:</strong> name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.</p>
      <p><strong>Purpose of collection:</strong> to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>
      <p><strong>Source of collection:</strong> collected from you.</p>
      <p><strong>Disclosure for a business purpose:</strong> shared with our processor Shopify.</p>

      <h3>Customer support information</h3>
      <p><strong>Purpose of collection:</strong> to provide customer support.</p>
      <p><strong>Source of collection:</strong> collected from you.</p>

      <h2>Minors</h2>
      <p>The Site is not intended for individuals under the age of 18. We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the address below to request deletion.</p>

      <h2>Sharing Personal Information</h2>
      <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:</p>
      <p>We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here: <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noreferrer">https://www.shopify.com/legal/privacy</a>.</p>
      <p>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

      <h2>Behavioural Advertising</h2>
      <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:</p>
      <p>We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here: <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noreferrer">https://policies.google.com/privacy?hl=en</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">https://tools.google.com/dlpage/gaoptout</a>.</p>
      <p>For more information about how targeted advertising works, you can visit the Network Advertising Initiative's ("NAI") educational page at <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noreferrer">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a>.</p>
      <p>You can opt out of targeted advertising by:</p>
      <p>
        <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noreferrer">Facebook</a><br/>
        <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noreferrer">Google</a><br/>
        <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noreferrer">Bing</a>
      </p>
      <p>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance's opt-out portal at: <a href="http://optout.aboutads.info/" target="_blank" rel="noreferrer">http://optout.aboutads.info/</a>.</p>

      <h2>Using Personal Information</h2>
      <p>We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.</p>

      <h2>Lawful Basis</h2>
      <p>Pursuant to the General Data Protection Regulation ("GDPR"), if you are a resident of the European Economic Area ("EEA"), we process your personal information under the following lawful bases:</p>
      <p>Your consent; The performance of the contract between you and the Site; Compliance with our legal obligations; To protect your vital interests; To perform a task carried out in the public interest; For our legitimate interests, which do not override your fundamental rights and freedoms.</p>

      <h2>Retention</h2>
      <p>When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the 'Your rights' section below.</p>

      <h2>Automatic Decision-Making</h2>
      <p>If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which includes profiling), when that decision-making has a legal effect on you or otherwise significantly affects you.</p>
      <p>Our processor Shopify uses limited automated decision-making to prevent fraud that does not have a legal or otherwise significant effect on you.</p>
      <p>Services that include elements of automated decision-making include:</p>
      <p>Temporary denylist of IP addresses associated with repeated failed transactions. This denylist persists for a small number of hours.</p>
      <p>Temporary denylist of credit cards associated with denylisted IP addresses. This denylist persists for a small number of days.</p>

      <h2>GDPR</h2>
      <p>If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.</p>
      <p>Your Personal Information will be initially processed in Ireland and then will be transferred outside of Europe for storage and further processing, including to Canada and the United States. For more information on how data transfers comply with the GDPR, see Shopify's GDPR Whitepaper: <a href="https://help.shopify.com/en/manual/your-account/privacy/GDPR" target="_blank" rel="noreferrer">https://help.shopify.com/en/manual/your-account/privacy/GDPR</a>.</p>

      <h2>CCPA</h2>
      <p>If you are a resident of California, you have the right to access the Personal Information we hold about you (also known as the 'Right to Know'), to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.</p>
      <p>If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the address below.</p>

      <h2>Cookies</h2>
      <p>A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don't have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it's their first time visiting or if they are a frequent visitor.</p>
      <p>We use the following cookies to optimize your experience on our Site and to provide our services.</p>

      <h3>Cookies Necessary for the Functioning of the Store</h3>
      <p><strong>_ab</strong> – Used in connection with access to admin.<br/>
      <strong>_secure_session_id</strong> – Used in connection with navigation through a storefront.<br/>
      <strong>cart</strong> – Used in connection with shopping cart.<br/>
      <strong>cart_sig</strong> – Used in connection with checkout.<br/>
      <strong>cart_ts</strong> – Used in connection with checkout.<br/>
      <strong>checkout_token</strong> – Used in connection with checkout.<br/>
      <strong>secret</strong> – Used in connection with checkout.<br/>
      <strong>secure_customer_sig</strong> – Used in connection with customer login.<br/>
      <strong>storefront_digest</strong> – Used in connection with customer login.<br/>
      <strong>_shopify_u</strong> – Used to facilitate updating customer account information.</p>

      <h3>Reporting and Analytics</h3>
      <p><strong>_tracking_consent</strong> – Tracking preferences.<br/>
      <strong>_landing_page</strong> – Track landing pages.<br/>
      <strong>_orig_referrer</strong> – Track landing pages.<br/>
      <strong>_s</strong> – Shopify analytics.<br/>
      <strong>_shopify_s</strong> – Shopify analytics.<br/>
      <strong>_shopify_sa_p</strong> – Shopify analytics relating to marketing & referrals.<br/>
      <strong>_shopify_sa_t</strong> – Shopify analytics relating to marketing & referrals.<br/>
      <strong>_shopify_y</strong> – Shopify analytics.<br/>
      <strong>_y</strong> – Shopify analytics.</p>

      <p>The length of time that a cookie remains on your computer or mobile device depends on whether it is a "persistent" or "session" cookie. Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted. Most of the cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device.</p>
      <p>You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible.</p>
      <p>Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser's "Tools" or "Preferences" menu. For more information on how to modify your browser settings or how to block, manage or filter cookies can be found in your browser's help file or through such sites as <a href="https://www.allaboutcookies.org" target="_blank" rel="noreferrer">www.allaboutcookies.org</a>.</p>
      <p>Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as our advertising partners. To exercise your rights or opt-out of certain uses of your information by these parties, please follow the instructions in the "Behavioural Advertising" section above.</p>

      <h2>Do Not Track</h2>
      <p>Please note that because there is no consistent industry understanding of how to respond to "Do Not Track" signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.</p>

      <h2>Changes</h2>
      <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>

      <h2>Contact</h2>
      <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail or by mail using the details provided below:</p>
      <p>Chicagopcb Terminal block, 824 North 7th Street, Quincy IL 62301, United States</p>
      <p>
        <strong>Address:</strong> 824 N 7th Street, Quincy, IL 62301, United States<br/>
        <strong>Email:</strong> <a href="mailto:customercare@blessingsells.com">customercare@blessingsells.com</a><br/>
        <strong>Hotline:</strong> <a href="tel:+12176954009">+1 (217) 695-4009</a><br/>
        <strong>Website:</strong> <a href="https://www.blessingsells.com" target="_blank" rel="noreferrer">www.blessingsells.com</a>
      </p>
      <p><em>Last updated: April 2022</em></p>
      <p>If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority. You can contact your local data protection authority, or our supervisory authority.</p>
    `,
  },

  "terms-of-service": {
    title: "Terms of Service",
    content: `
      <h2>Overview</h2>
      <p>This website is operated by <strong>Blessingsells</strong>. Throughout the site, the terms "we", "us" and "our" refer to Blessingsells. Blessingsells offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
      <p>By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</p>
      <p>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.</p>
      <p>Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>
      <p>Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.</p>

      <h2>Section 1 – Online Store Terms</h2>
      <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
      <p>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
      <p>You must not transmit any worms or viruses or any code of a destructive nature.</p>
      <p>A breach or violation of any of the Terms will result in an immediate termination of your Services.</p>

      <h2>Section 2 – General Conditions</h2>
      <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
      <p>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</p>
      <p>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</p>
      <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>

      <h2>Section 3 – Accuracy, Completeness and Timeliness of Information</h2>
      <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.</p>
      <p>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</p>

      <h2>Section 4 – Modifications to the Service and Prices</h2>
      <p>Prices for our products are subject to change without notice.</p>
      <p>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
      <p>We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>

      <h2>Section 5 – Products or Services</h2>
      <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
      <p>We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
      <p>We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.</p>
      <p>We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.</p>

      <h2>Section 6 – Accuracy of Billing and Account Information</h2>
      <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.</p>
      <p>You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>
      <p>For more detail, please review our Returns Policy.</p>

      <h2>Section 7 – Optional Tools</h2>
      <p>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</p>
      <p>You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</p>
      <p>Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</p>
      <p>We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.</p>

      <h2>Section 8 – Third-Party Links</h2>
      <p>Certain content, products and services available via our Service may include materials from third-parties.</p>
      <p>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.</p>
      <p>We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.</p>

      <h2>Section 9 – User Comments, Feedback and Other Submissions</h2>
      <p>If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.</p>
      <p>We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.</p>
      <p>You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.</p>

      <h2>Section 10 – Personal Information</h2>
      <p>Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.</p>

      <h2>Section 11 – Errors, Inaccuracies and Omissions</h2>
      <p>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</p>
      <p>We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.</p>

      <h2>Section 12 – Prohibited Uses</h2>
      <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>

      <h2>Section 13 – Disclaimer of Warranties; Limitation of Liability</h2>
      <p>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</p>
      <p>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</p>
      <p>You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</p>
      <p>You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.</p>
      <p>In no case shall Blessingsells, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</p>

      <h2>Section 14 – Indemnification</h2>
      <p>You agree to indemnify, defend and hold harmless Blessingsells and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</p>

      <h2>Section 15 – Severability</h2>
      <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>

      <h2>Section 16 – Termination</h2>
      <p>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</p>
      <p>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.</p>
      <p>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</p>

      <h2>Section 17 – Entire Agreement</h2>
      <p>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</p>
      <p>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</p>
      <p>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</p>

      <h2>Section 18 – Governing Law</h2>
      <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of United States.</p>

      <h2>Section 19 – Changes to Terms of Service</h2>
      <p>You can review the most current version of the Terms of Service at any time at this page.</p>
      <p>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>

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

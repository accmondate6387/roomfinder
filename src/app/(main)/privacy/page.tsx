export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-primary">
        <p>Last updated: June 13, 2026</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information that you provide directly to us when you create an account, fill out your profile, submit a listing, or contact support. This may include your name, email address, phone number, and ID verification documents (for owners).</p>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services.</li>
          <li>Verify the identity of property owners to ensure safety.</li>
          <li>Communicate with you regarding your account, listings, or inquiries.</li>
          <li>Analyze usage patterns to enhance user experience.</li>
        </ul>
        
        <h2>3. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Verification documents are stored securely and automatically deleted after the verification process is complete.</p>
        
        <h2>4. Sharing of Information</h2>
        <p>We do not sell your personal information. We may share information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service.</p>
        
        <h2>5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@roomfinder.in.</p>
      </div>
    </div>
  );
}

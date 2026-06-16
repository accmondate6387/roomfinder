export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-primary">
        <p>Last updated: June 13, 2026</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using RoomFinder Prayagraj, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
        
        <h2>2. User Accounts</h2>
        <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>
        
        <h2>3. Property Listings</h2>
        <p>Owners are solely responsible for the accuracy of their property listings. We reserve the right to remove any listing that violates our policies, contains misleading information, or receives multiple reports of fraud.</p>
        
        <h2>4. Prohibited Activities</h2>
        <p>You agree not to engage in any of the following prohibited activities:</p>
        <ul>
          <li>Copying, distributing, or disclosing any part of the service in any medium.</li>
          <li>Using any automated system to access the service.</li>
          <li>Attempting to interfere with the servers or networks connected to the service.</li>
          <li>Posting false, inaccurate, or misleading information.</li>
        </ul>
        
        <h2>5. Limitation of Liability</h2>
        <p>RoomFinder acts as a platform connecting students with property owners. We do not own or manage the properties listed and are not responsible for any disputes, damages, or losses arising from lease agreements or interactions between users.</p>
      </div>
    </div>
  );
}

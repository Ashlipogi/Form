import ContactForm from '@/components/ContactForm';
import SubmissionSuccess from '@/components/SubmissionSuccess';
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '@/lib/supabaseClient';

const SERVICE_ID = 'service_obxutde';
const TEMPLATE_ID_OWNER = 'template_icp86z7';
const TEMPLATE_ID_CLIENT = 'template_rh7v4ah';
const PUBLIC_KEY = 'X7AbUfNnik_mF4TZP';

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<null | {
    name: string;
    email: string;
    contactNumber: string;
  }>(null);

  const [recipientEmail, setRecipientEmail] = useState('');
  const [customizeLink, setCustomizeLink] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('form_settings')
        .select('default_email, customize_link')
        .limit(1)
        .single();

      if (error) {
        console.error('Failed to load settings:', error.message);
        alert('Failed to load email settings. Please contact support.');
        return;
      }

      setRecipientEmail(data.default_email || '');
      setCustomizeLink(data.customize_link || '');
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    contactNumber: string;
  }) => {
    setIsSubmitting(true);

    try {
      // Send to form owner
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID_OWNER,
        {
          name: formData.name,
          email: formData.email,
          contact: formData.contactNumber,
          to_email: recipientEmail,
        },
        PUBLIC_KEY
      );

      // Send thank-you to client
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID_CLIENT,
        {
          to_name: formData.name,
          to_email: formData.email,
          url: customizeLink,
        },
        PUBLIC_KEY
      );

      setSubmittedData(formData);
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('There was an error sending the email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  return submittedData ? (
    <SubmissionSuccess onReset={handleReset} formData={submittedData} />
  ) : (
    <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
  );
};

export default Index;

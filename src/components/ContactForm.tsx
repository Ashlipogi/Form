import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import emailjs from '@emailjs/browser';
import SubmissionSuccess from '@/components/SubmissionSuccess';
import { supabase } from '@/lib/supabaseClient';

const SERVICE_ID = 'service_obxutde';
const TEMPLATE_ID_OWNER = 'template_icp86z7';
const TEMPLATE_ID_CLIENT = 'template_rh7v4ah';
const PUBLIC_KEY = 'X7AbUfNnik_mF4TZP';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: ''
  });

  const [recipientEmail, setRecipientEmail] = useState('');
  const [customizeLink, setCustomizeLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load global settings on mount from Supabase
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('form_settings')
          .select('default_email, customize_link')
          .limit(1);

        if (error) {
          console.error('Failed to load settings:', error);
          setError('Failed to load email settings. Please contact support.');
          return;
        }

        // Handle case where no data exists
        if (!data || data.length === 0) {
          console.warn('No settings found, using defaults');
          setRecipientEmail('');
          setCustomizeLink('');
          return;
        }

        // Use the first (and should be only) row
        const settings = data[0];
        setRecipientEmail(settings.default_email || '');
        setCustomizeLink(settings.customize_link || '');
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to load email settings. Please contact support.');
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send email to form owner
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

      // Send thank you email to client
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID_CLIENT,
        {
          to_name: formData.name,
          to_email: formData.email,
          name: formData.name,
          email: formData.email,
          url: customizeLink,
        },
        PUBLIC_KEY
      );

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err?.text || err?.message || `Error ${err?.status || 'unknown'}: Failed to send email`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      contactNumber: ''
    });
    setIsSubmitted(false);
    setError(null);
  };

  if (isSubmitted) {
    return <SubmissionSuccess onReset={resetForm} formData={formData} />;
  }

  return (
    <div className="brutalist-container">
      <div className="brutalist-form-wrapper">
        <div className="brutalist-header">
          <h1 className="brutalist-title">CONTACT FORM</h1>
          <div className="brutalist-underline"></div>
        </div>

        {error && (
          <div className="brutalist-error">
            <p>Error: {error}</p>
            <p className="text-sm mt-2">Check the browser console for more details.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="brutalist-form">
          <div className="brutalist-field">
            <Label htmlFor="name" className="brutalist-label">NAME</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="brutalist-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="brutalist-field">
            <Label htmlFor="email" className="brutalist-label">EMAIL</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="brutalist-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="brutalist-field">
            <Label htmlFor="contactNumber" className="brutalist-label">CONTACT NUMBER</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="brutalist-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" className="brutalist-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
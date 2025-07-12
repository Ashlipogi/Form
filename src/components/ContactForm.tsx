import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import emailjs from '@emailjs/browser';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send to form owner
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID_OWNER,
        {
          name: formData.name,
          email: formData.email,
          contact: formData.contactNumber,
          to_email: 'villanuevajohn519@gmail.com',
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
        },
        PUBLIC_KEY
      );

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err?.text || err?.message || 'An unknown error occurred');
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
    return (
      <div className="brutalist-container">
        <div className="brutalist-success-wrapper">
          <div className="brutalist-success-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="brutalist-success-title">THANK YOU!</h1>
          <div className="brutalist-underline brutalist-underline-success"></div>
          <p className="brutalist-success-message">
            We've received your information and sent a confirmation to your email.
          </p>
          <Button onClick={resetForm} className="brutalist-submit-btn">
            SUBMIT ANOTHER
          </Button>
        </div>
      </div>
    );
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
          </div>
        )}

        <form onSubmit={handleSubmit} className="brutalist-form">
          <div className="brutalist-field">
            <Label htmlFor="name" className="brutalist-label">
              NAME
            </Label>
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
            <Label htmlFor="email" className="brutalist-label">
              EMAIL
            </Label>
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
            <Label htmlFor="contactNumber" className="brutalist-label">
              CONTACT NUMBER
            </Label>
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

          <Button
            type="submit"
            className="brutalist-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

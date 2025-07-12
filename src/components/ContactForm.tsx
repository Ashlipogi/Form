
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
}

const ContactForm = ({ onSubmit, isSubmitting }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contactNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="brutalist-container">
      <div className="brutalist-form-wrapper">
        <div className="brutalist-header">
          <h1 className="brutalist-title">CONTACT FORM</h1>
          <div className="brutalist-underline"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="brutalist-form">
          <div className="brutalist-field">
            <Label htmlFor="name" className="brutalist-label">
              NAME
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="brutalist-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="brutalist-field">
            <Label htmlFor="contact" className="brutalist-label">
              CONTACT NUMBER
            </Label>
            <Input
              id="contact"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
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
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

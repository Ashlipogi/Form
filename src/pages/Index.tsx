
import { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import SubmissionSuccess from '@/components/SubmissionSuccess';

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
}

const Index = () => {
  const [formState, setFormState] = useState<'form' | 'submitting' | 'success'>('form');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    setFormState('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmittedData(data);
    setFormState('success');
  };

  const handleReset = () => {
    setFormState('form');
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen brutalist-bg">
      {formState === 'success' && submittedData ? (
        <SubmissionSuccess 
          formData={submittedData} 
          onReset={handleReset}
        />
      ) : (
        <ContactForm 
          onSubmit={handleFormSubmit}
          isSubmitting={formState === 'submitting'}
        />
      )}
    </div>
  );
};

export default Index;

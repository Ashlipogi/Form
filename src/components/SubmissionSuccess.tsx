
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SubmissionSuccessProps {
  onReset: () => void;
  formData: {
    name: string;
    email: string;
    contactNumber: string;
  };
}

const SubmissionSuccess = ({ onReset, formData }: SubmissionSuccessProps) => {
  return (
    <div className="brutalist-container">
      <div className="brutalist-success-wrapper">
        <div className="brutalist-success-icon">
          <Check size={80} className="text-black" strokeWidth={4} />
        </div>
        
        <h1 className="brutalist-success-title">FORM SUBMITTED</h1>
        <div className="brutalist-underline brutalist-underline-success"></div>
        
        <div className="brutalist-success-details">
          <h2 className="brutalist-subtitle">SUBMISSION DETAILS</h2>
          
          <div className="brutalist-detail-item">
            <span className="brutalist-detail-label">NAME:</span>
            <span className="brutalist-detail-value">{formData.name}</span>
          </div>
          
          <div className="brutalist-detail-item">
            <span className="brutalist-detail-label">EMAIL:</span>
            <span className="brutalist-detail-value">{formData.email}</span>
          </div>
          
          <div className="brutalist-detail-item">
            <span className="brutalist-detail-label">CONTACT:</span>
            <span className="brutalist-detail-value">{formData.contactNumber}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SubmissionSuccess;

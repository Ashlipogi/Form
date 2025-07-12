import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="brutalist-container">
      <div className="brutalist-form-wrapper">
        <div className="brutalist-header">
          <div className="brutalist-error-icon mb-4">
            <AlertTriangle size={80} className="text-black" strokeWidth={4} />
          </div>
          <h1 className="brutalist-title">PAGE NOT FOUND</h1>
          <div className="brutalist-underline"></div>
        </div>

        <div className="brutalist-error-content">
          <p className="brutalist-error-description">
            THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST
          </p>
          
          <Button
            onClick={() => navigate('/')}
            className="brutalist-submit-btn mt-6"
          >
            <Home size={20} className="mr-2" />
            GO HOME
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
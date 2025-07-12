import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Mail, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [defaultEmail, setDefaultEmail] = useState('');
  const [customizeLink, setCustomizeLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    // Load saved data from localStorage
    const savedEmail = localStorage.getItem('default_recipient_email');
    const savedLink = localStorage.getItem('customize_link');
    setDefaultEmail(savedEmail || '');
    setCustomizeLink(savedLink || '');
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate a brief save operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Save to localStorage
    localStorage.setItem('default_recipient_email', defaultEmail);
    localStorage.setItem('customize_link', customizeLink);
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleClear = () => {
    setDefaultEmail('');
    setCustomizeLink('');
    localStorage.removeItem('default_recipient_email');
    localStorage.removeItem('customize_link');
    setSaveSuccess(false);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidUrl = (url: string) => {
    if (!url) return true; // Allow empty URL
    try {
      new URL(url);
      return true;
    } catch {
      return /^https?:\/\/.+/.test(url);
    }
  };

  const canSave = defaultEmail.trim() !== '' && 
                  isValidEmail(defaultEmail) && 
                  (customizeLink === '' || isValidUrl(customizeLink)) && 
                  !isSaving;

  if (isLoading) {
    return (
      <div className="brutalist-container">
        <div className="brutalist-form-wrapper">
          <div className="brutalist-header">
            <h1 className="brutalist-title">LOADING...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-container">
      <div className="brutalist-form-wrapper">
        <div className="brutalist-header">
            <Button
            onClick={() => navigate('/')}
            className="brutalist-back-btn mb-4"
            variant="outline"
            >
            <ArrowLeft size={20} className="mr-2" />
            BACK TO CONTACT
            </Button>

          
          <h1 className="brutalist-title">EMAIL TEMPLATE SETTINGS</h1>
          <div className="brutalist-underline"></div>
        </div>

        {saveSuccess && (
          <div className="brutalist-success-message">
            <div className="flex items-center justify-center mb-2">
              <Save size={20} className="mr-2" />
              SETTINGS SAVED SUCCESSFULLY
            </div>
          </div>
        )}

        <div className="brutalist-form">
          <div className="brutalist-field">
            <Label htmlFor="defaultEmail" className="brutalist-label">
              DEFAULT EMAIL ADDRESS *
            </Label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <Input
                id="defaultEmail"
                type="email"
                value={defaultEmail}
                onChange={(e) => setDefaultEmail(e.target.value)}
                className="brutalist-input pl-12"
                placeholder="Enter default email address..."
                disabled={isSaving}
              />
            </div>
            {defaultEmail && !isValidEmail(defaultEmail) && (
              <p className="brutalist-error-text mt-2">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className="brutalist-field">
            <Label htmlFor="customizeLink" className="brutalist-label">
              CUSTOMIZE LINK
            </Label>
            <div className="relative">
              <Link size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <Input
                id="customizeLink"
                type="url"
                value={customizeLink}
                onChange={(e) => setCustomizeLink(e.target.value)}
                className="brutalist-input pl-12"
                placeholder="https://drive.google.com/drive/folders/..."
                disabled={isSaving}
              />
            </div>
            {customizeLink && !isValidUrl(customizeLink) && (
              <p className="brutalist-error-text mt-2">
                Please enter a valid URL (starting with http:// or https://)
              </p>
            )}
            <p className="text-sm text-gray-600 mt-1">
              Leave empty to use default placeholder. This URL will replace {`{url}`} in the email template.
            </p>
          </div>

          <div className="brutalist-current-email">
            <h3 className="brutalist-subtitle mb-2">CURRENT SETTINGS</h3>
            <div className="brutalist-info-box">
              <div className="brutalist-info-item">
                <span className="brutalist-info-label">DEFAULT EMAIL:</span>
                <span className="brutalist-info-value">
                  {localStorage.getItem('default_recipient_email') || 'No default email set'}
                </span>
              </div>
<div className="brutalist-info-item mt-2">
  <span className="brutalist-info-label">CUSTOMIZE LINK:</span>
  <span className="brutalist-info-value">
    {customizeLink ? (
      <a
        href={customizeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600 hover:text-blue-800 font-semibold"
      >
        View Google Drive Folder
      </a>
    ) : (
      'No Link'
    )}
  </span>
</div>

            </div>
          </div>

          <div className="brutalist-button-group">
            <Button
              onClick={handleSave}
              className="brutalist-submit-btn"
              disabled={!canSave}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  SAVING...
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  SAVE SETTINGS
                </>
              )}
            </Button>

            <Button
              onClick={handleClear}
              className="brutalist-reset-btn"
              variant="outline"
              disabled={isSaving}
            >
              CLEAR ALL SETTINGS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
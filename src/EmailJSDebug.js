import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const EmailJSDebug = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);

  // Replace these with your actual values
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

  const addDebugInfo = (message, type = 'info') => {
    setDebugInfo(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
    console.log(`[${type.toUpperCase()}]`, message);
  };

  useEffect(() => {
    addDebugInfo('=== EmailJS Debug Test Started ===', 'info');
    
    // Check environment variables
    addDebugInfo(`Public Key: ${publicKey ? publicKey.substring(0, 10) + '...' : 'MISSING'}`, publicKey ? 'success' : 'error');
    addDebugInfo(`Service ID: ${serviceId || 'MISSING'}`, serviceId ? 'success' : 'error');
    addDebugInfo(`Template ID: ${templateId || 'MISSING'}`, templateId ? 'success' : 'error');
    
    // Check if emailjs is imported
    if (emailjs) {
      addDebugInfo('✓ EmailJS library imported successfully', 'success');
    } else {
      addDebugInfo('✗ EmailJS library not imported', 'error');
    }

    // Initialize EmailJS
    if (publicKey) {
      try {
        emailjs.init(publicKey);
        addDebugInfo('✓ EmailJS initialized with public key', 'success');
      } catch (error) {
        addDebugInfo(`✗ Error initializing EmailJS: ${error.message}`, 'error');
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testEmailJS = async () => {
    addDebugInfo('=== Starting Email Send Test ===', 'info');
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate configuration
    if (!publicKey || !serviceId || !templateId) {
      addDebugInfo('✗ Missing configuration. Check your .env file', 'error');
      addDebugInfo('Make sure you have: REACT_APP_EMAILJS_PUBLIC_KEY, REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID', 'error');
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    // Prepare template parameters
    const templateParams = {
      name: formData.from_name,
      email: formData.reply_to,
      message: formData.message
    };
    
    addDebugInfo('Template params prepared:', 'info');
    addDebugInfo(JSON.stringify(templateParams, null, 2), 'info');

    // Send email
    try {
      addDebugInfo('Calling emailjs.send()...', 'info');
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      addDebugInfo('✓ Email sent successfully!', 'success');
      addDebugInfo(`Response status: ${result.status}`, 'success');
      addDebugInfo(`Response text: ${result.text}`, 'success');
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        from_name: '',
        reply_to: '',
        message: ''
      });
    } catch (error) {
      addDebugInfo('✗ Failed to send email', 'error');
      addDebugInfo(`Error name: ${error.name}`, 'error');
      addDebugInfo(`Error message: ${error.message || error.text}`, 'error');
      addDebugInfo(`Error status: ${error.status}`, 'error');
      
      if (error.text) {
        addDebugInfo(`Error text: ${error.text}`, 'error');
      }
      
      // Common error interpretations
      if (error.status === 400) {
        addDebugInfo('→ Status 400: Check if template ID is correct', 'error');
      } else if (error.status === 401) {
        addDebugInfo('→ Status 401: Check if public key is correct', 'error');
      } else if (error.status === 404) {
        addDebugInfo('→ Status 404: Check if service ID or template ID exists', 'error');
      } else if (error.status === 412) {
        addDebugInfo('→ Status 412: Template parameters might not match template variables', 'error');
      }
      
      addDebugInfo('Full error object: ' + JSON.stringify(error, null, 2), 'error');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      addDebugInfo('=== Email Send Test Completed ===', 'info');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ marginBottom: '10px' }}>EmailJS Debug Test</h1>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>
        Use this page to test and debug your EmailJS integration
      </p>
      
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #3b82f6' }}>
        <h3 style={{ marginTop: 0, color: '#1e40af' }}>📋 Checklist:</h3>
        <ul style={{ color: '#1e40af', lineHeight: '1.8', marginBottom: 0 }}>
          <li>✓ .env file exists in root directory</li>
          <li>✓ Environment variables start with REACT_APP_</li>
          <li>✓ Development server restarted after .env changes</li>
          <li>✓ EmailJS template variables are: name, email, message</li>
          <li>✓ EmailJS service is active in your dashboard</li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Left: Form */}
        <div>
          <h3 style={{ marginBottom: '15px' }}>Test Form</h3>
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            value={formData.from_name}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '12px', 
              borderRadius: '6px', 
              border: '1px solid #d1d5db',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          <input
            type="email"
            name="reply_to"
            placeholder="Your Email"
            value={formData.reply_to}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '12px', 
              borderRadius: '6px', 
              border: '1px solid #d1d5db',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '12px', 
              borderRadius: '6px', 
              border: '1px solid #d1d5db',
              fontSize: '14px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          
          {submitStatus === 'success' && (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#d1fae5', 
              color: '#065f46',
              borderRadius: '6px',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              ✓ Message sent successfully!
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#fee2e2', 
              color: '#991b1b',
              borderRadius: '6px',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              ✗ Failed to send message. Check debug log →
            </div>
          )}
          
          <button
            onClick={testEmailJS}
            disabled={isSubmitting || !formData.from_name || !formData.reply_to || !formData.message}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: (!formData.from_name || !formData.reply_to || !formData.message) ? 0.5 : 1
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Test Email'}
          </button>
        </div>

        {/* Right: Debug Log */}
        <div>
          <h3 style={{ marginBottom: '15px' }}>Debug Log</h3>
          <div style={{ 
            backgroundColor: '#1f2937', 
            color: '#f9fafb', 
            padding: '15px', 
            borderRadius: '8px',
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '12px',
            maxHeight: '500px',
            overflowY: 'auto',
            minHeight: '400px'
          }}>
            {debugInfo.length === 0 ? (
              <div style={{ opacity: 0.5 }}>Waiting for test...</div>
            ) : (
              debugInfo.map((info, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    marginBottom: '6px',
                    color: info.type === 'error' ? '#fca5a5' : info.type === 'success' ? '#86efac' : '#d1d5db',
                    paddingLeft: '8px',
                    borderLeft: `3px solid ${info.type === 'error' ? '#ef4444' : info.type === 'success' ? '#22c55e' : '#6b7280'}`,
                    paddingTop: '2px',
                    paddingBottom: '2px'
                  }}
                >
                  <span style={{ opacity: 0.5, marginRight: '8px' }}>[{info.time}]</span>
                  {info.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailJSDebug;
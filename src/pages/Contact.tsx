import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// تهيئة EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await emailjs.send(
        'service_qzdavhy',
        'template_24i8bww',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'amr508396@gmail.com'
        }
      );
      
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('حدث خطأ في الإرسال. حاول مرة أخرى');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">تواصل معنا</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mb-8 text-gray-600">
            نحن نسعى للرد على جميع الاستفسارات في أقرب وقت ممكن
          </p>
          
          {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
              ✅ تم إرسال الرسالة بنجاح!
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
              ❌ {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">الاسم</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">الرسالة</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? '⏳ جاري الإرسال...' : '📧 إرسال'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
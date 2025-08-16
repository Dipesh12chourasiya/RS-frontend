import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-lime-800 text-white py-12 px-8'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
        {/* About Section */}
        <div>
          <h2 className='text-2xl font-bold mb-4 text-green-100'>Green Harvest</h2>
          <p className='text-sm text-green-200'>
            Your trusted partner for sustainable farming and agricultural technology. We provide high-quality equipment to help your farm thrive.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className='text-xl font-semibold mb-4 text-green-100'>Quick Links</h3>
          <ul className='space-y-2 text-green-200'>
            <li><a href="/" className='hover:underline hover:text-green-50 transition-colors'>Home</a></li>
            <li><a href="/AllEquipments" className='hover:underline hover:text-green-50 transition-colors'>Equipment</a></li>
            <li><a href="#" className='hover:underline hover:text-green-50 transition-colors'>About Us</a></li>
            <li><a href="#" className='hover:underline hover:text-green-50 transition-colors'>Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social Section */}
        <div>
          <h3 className='text-xl font-semibold mb-4 text-green-100'>Follow Us</h3>
          <div className='flex justify-center md:justify-start space-x-6 text-2xl'>
            <a href="#" aria-label="Facebook" className='hover:text-green-50 transition-colors'>
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className='hover:text-green-50 transition-colors'>
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className='hover:text-green-50 transition-colors'>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
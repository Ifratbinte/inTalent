import React from 'react';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    <h1 className="mb-4 text-white" data-testid="hero-title">
      inTalents
    </h1>
  
    <p className="lead text-white" data-testid="hero-lead">
      Be part of the top global entertainment network
    </p>
    <a
      href="/api/auth/login"
      className="btn btn-margin btn-block text-white"
      tabIndex={0}
      style={{ background: '#e95f24', borderRadius: '12px' }}>
      Sign Up
    </a>
    <p className="text-white">Already have an account?</p>
    <a
      href="/api/auth/login"
      className="btn btn-margin btn-block text-white"
      tabIndex={0}
      style={{ background: 'transparent', border: '1px solid #fff', borderRadius: '12px' }}>
      Login
    </a>
  </div>
);

export default Hero;

import React from 'react'
import { User ,Lock} from 'lucide-react';
function How() {
    return (
        <section className="how-it-works" id="how">
            <div className="section-header">
                <h2>How It Works</h2>
                <p>Get started with Saap in three simple steps</p>
            </div>

            <div className="steps-container">
                <div className="step-card">
                    <div className="step-icon">
                        <User className='icon'/>
                    </div>
                    <h3>1. Create Account</h3>
                    <p>Sign up in seconds using your email or phone number. No lengthy paperwork.</p>
                </div>

                <div className="step-card">
                    <div className="step-icon">
                        <Lock className='icon'/>
                    </div>
                    <h3>2. Secure Connection</h3>
                    <p>Link your bank account or wallet with our bank-grade encrypted system.</p>
                </div>

                <div className="step-card">
                    <div className="step-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </div>
                    <h3>3. Fast Transactions</h3>
                    <p>Send and receive payments instantly across borders with minimal fees.</p>
                </div>
            </div>
        </section>
    )
}

export default How
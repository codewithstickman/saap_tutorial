import React, { useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import { Copy, ArrowUpRight, ArrowDownLeft, ExternalLink, Code, LogOut, Wallet } from "lucide-react";
// 
import { useNavigate } from "react-router-dom";
import { formatDate, truncateAddress } from "../utils/utils";

function Dashboard() {
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedHtml, setCopiedHtml] = useState(false);
    const [USDCamount, setUSDCamount] = useState(0);

    const navigate = useNavigate();


    const paymentLink = `${window.location.origin}/merchant/` + `nuelyoungtech`;
    const htmlCode = `<a href="${paymentLink}" target="_blank" style="display:inline-flex;align-items:center;gap:10px;padding:12px 20px;background:#fff;border:1px solid #e0e0e0;border-radius:12px;text-decoration:none;color:#111;font-size:15px;font-weight:500;cursor:pointer;transition:background 0.15s,border-color 0.15s,transform 0.1s;">
  <div style="width:28px;height:28px;background:#1D9E75;border-radius:8px;display:flex;align-items:center;justify-content:center;">
    <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>
  </div>
  <div style="display:flex;flex-direction:column;line-height:1.2;">
    <span style="font-size:11px;color:#888;font-weight:400;">Secure checkout</span>
    <span style="font-size:14px;font-weight:500;">Pay with Saap</span>
  </div>
  <span style="margin-left:4px;color:#aaa;">→</span>
</a>`;


    const handleCopyLink = () => {
        navigator.clipboard.writeText(paymentLink);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(htmlCode);
        setCopiedHtml(true);
        setTimeout(() => setCopiedHtml(false), 2000);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const transactionsData = [
        { id: 1, address: "0x35f9621e9d943e46c418b9556bdbcf5214ae0f47", chain: "Base", amount: "+ 20.00 USDC", date: "Oct 24, 2026", type: "receive" },
        { id: 2, address: "0x35f9621e9d943e46c418b9556bdbcf5214ae0f47", chain: "Base", amount: "+ 120.00 USDC", date: "Oct 22, 2026", type: "receive" },
        { id: 3, address: "0x35f9621e9d943e46c418b9556bdbcf5214ae0f47", chain: "Base", amount: "- 100.00 USDC", date: "Oct 20, 2026", type: "withdraw" },
        { id: 4, address: "0x35f9621e9d943e46c418b9556bdbcf5214ae0f47", chain: "Base", amount: "+ 45.50 USDC", date: "Oct 18, 2026", type: "receive" },
        { id: 5, address: "0x35f9621e9d943e46c418b9556bdbcf5214ae0f47", chain: "Base", amount: "+ 250.00 USDC", date: "Oct 15, 2026", type: "receive" },
    ];


    return (
        <div className="dashboard-container">
            {/* Header: Balance & Withdraw */}
            <header className="dashboard-header">
                <div className="balance-section">
                    <p className="balance-label">Deposited USDC</p>
                    <h1 className="balance-amount">$0 <span className="currency">USDC</span></h1>
                </div>
                <div className="btns">
                    <button className="signout-btn" onClick={handleLogout}>
                        <LogOut size={18} /> Sign out
                    </button>
                    {/* <button className="withdraw-btn">
                    <ArrowUpRight size={18} /> Withdraw
                </button> */}
                </div>
            </header>

            <div className="dashboard-grid">
                {/* Left Column: Links & HTML */}
                <section className="share-section">
                    <h2>Receive Payments</h2>
                    <p className="section-desc">Share your link or embed the button on your website.</p>

                    <div className="copy-card">
                        <div className="copy-header">
                            <ExternalLink size={18} /> Payment Link
                        </div>
                        <div className="copy-body">
                            <input type="text" readOnly value={paymentLink} />
                            <button className="copy-btn" onClick={handleCopyLink}>
                                {copiedLink ? "Copied!" : <Copy size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="copy-card">
                        <div className="copy-header">
                            <Code size={18} /> HTML Button Code
                        </div>
                        <div className="copy-body">
                            <input type="text" readOnly value={htmlCode} />
                            <button className="copy-btn" onClick={handleCopyHtml}>
                                {copiedHtml ? "Copied!" : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                    <div className="copy-card">
                        <div className="copy-header">
                            <Wallet size={18} />  Withdraw USDC
                        </div>
                        <div className="copy-body">
                            {/* <input type="text" readOnly value={USDCamount} /> */}
                            <button className="withdraw-btn">Withdraw</button>

                        </div>
                    </div>
                </section>

                {/* Right Column: Transactions */}
                <section className="transactions-section">
                    <h2>Recent Transactions</h2>
                    <div className="transactions-list">
                        <div className="transaction-header">
                            <span> Wallet</span>
                            <span>Chain</span>
                            <span>Amount</span>
                            <span>Date</span>
                        </div>
                        {transactionsData && transactionsData.length > 0 &&  transactionsData.map(tx => (
                            <div className="transaction-item" key={tx._id}>
                                <div className="tx-details">
                                    <div className={`tx-icon ${tx.transactionType}`}>
                                        {tx.transactionType === 'INBOUND' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                    </div>
                                    <span className="tx-address">{truncateAddress(tx.address)}</span>
                                </div>
                                <div className="tx-chain">
                                    <span className="chain-badge">{tx.chain ? tx.chain.toLocaleLowerCase() : 'base'}</span>
                                </div>
                                <div className={`tx-amount ${tx.transactionType}`}>
                                    {tx.amount}
                                </div>
                                <div className="tx-date">
                                    {formatDate(tx.createdAt)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
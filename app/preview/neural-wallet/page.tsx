const sideNavItems = [
  { icon: 'grid_view', label: 'Command Matrix', active: false },
  { icon: 'memory', label: 'Agent Nodes', active: false },
  { icon: 'account_balance_wallet', label: 'Neural Wallet', active: true },
  { icon: 'shield', label: 'Boundary Control', active: false },
]

const cards = [
  { last4: '8492', agent: 'Project_Aries', frozen: false },
  { last4: '3317', agent: 'Beta-09_Scpr', frozen: false },
  { last4: '7701', agent: 'Gamma-44_Trd', frozen: true },
]

const transactions = [
  { time: '2025-03-24 10:43', merchant: 'AWS Cloud', agent: 'Project_Aries', amount: '$14.20', status: 'APPROVED', ok: true },
  { time: '2025-03-24 09:12', merchant: 'DigitalOcean', agent: 'Beta-09_Scpr', amount: '$5.00', status: 'APPROVED', ok: true },
  { time: '2025-03-23 22:01', merchant: 'Unknown API', agent: 'Gamma-44_Trd', amount: '$550.00', status: 'BLOCKED', ok: false },
  { time: '2025-03-23 18:44', merchant: 'OpenAI API', agent: 'Project_Aries', amount: '$8.75', status: 'APPROVED', ok: true },
]

export default function NeuralWallet() {
  return (
    <div className="min-h-screen flex" style={{ background: '#050914', color: '#E2E8F0', backgroundImage: 'linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      {/* Sidebar */}
      <div className="relative flex h-auto min-h-screen w-64 flex-col flex-shrink-0 z-20" style={{ background: 'rgba(11,18,33,0.7)', borderRight: '1px solid rgba(0,240,255,0.15)' }}>
        <div className="flex h-full grow flex-col p-4">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#00F0FF', boxShadow: '0 0 15px rgba(0,240,255,0.5)' }}>
              <span className="material-symbols-outlined text-[#050914] text-xl">terminal</span>
            </div>
            <h1 className="text-white text-lg font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>ALIASKIT</h1>
          </div>
          <div className="flex flex-col gap-2">
            {sideNavItems.map((item) => (
              <a key={item.label} href="#" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${item.active ? '' : 'hover:text-white'}`}
                style={item.active ? { background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.2)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.05)' } : { color: '#64748B' }}>
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syncopate), sans-serif', textTransform: 'uppercase', textShadow: '0 0 8px rgba(255,255,255,0.3)' }}>NEURAL WALLET</h2>
            <p className="text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>FINANCIAL PROTOCOL / ACTIVE</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all" style={{ fontFamily: 'var(--font-syncopate), sans-serif', border: '1px solid #00F0FF', color: '#00F0FF', borderRadius: 4, background: 'transparent' }}>
            <span className="material-symbols-outlined text-sm">add</span>
            ISSUE NEW CARD
          </button>
        </div>

        {/* Summary widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">payments</span>
            </div>
            <h3 className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>TOTAL NEURAL SPEND (30D)</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>$14,208.55</span>
              <span className="text-sm mb-1 flex items-center" style={{ color: '#39FF14', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
                <span className="material-symbols-outlined text-sm">arrow_upward</span> 2.4%
              </span>
            </div>
          </div>
          <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden">
            <h3 className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>ACTIVE CARDS / PROVISIONED</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>12</span>
              <span className="text-xl mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>/ 15</span>
            </div>
            <div className="w-full h-1 mt-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full" style={{ width: '80%', background: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }} />
            </div>
          </div>
          <div className="glass-panel p-6 flex flex-col justify-between">
            <h3 className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>GLOBAL SYSTEM LIMIT</h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>$50K</span>
            </div>
            <p className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>REMAINING BANDS: $35,791.45</p>
          </div>
        </div>

        {/* Card carousel */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}>
            <span className="material-symbols-outlined text-lg">credit_card</span>
            Issued Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.last4} className="card-container" style={{ height: 160 }}>
                <div className="card-inner" style={{ height: 160 }}>
                  <div className={`card-front`} style={card.frozen ? { borderColor: 'rgba(255,0,85,0.5)', boxShadow: '0 0 24px rgba(255,0,85,0.2)', background: 'rgba(11,18,33,0.9)' } : {}}>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">AliasCorp</span>
                      <span className="material-symbols-outlined text-white opacity-50">contactless</span>
                    </div>
                    <div>
                      <div className="text-lg text-white tracking-widest" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>**** {card.last4}</div>
                      <div className="flex justify-between items-end mt-1">
                        <span className="text-[10px] uppercase" style={{ color: '#64748B' }}>{card.agent}</span>
                        <span className="text-xs font-bold uppercase" style={{ color: card.frozen ? '#FF0055' : '#fff' }}>{card.frozen ? 'FROZEN' : 'Valid'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="flex flex-col gap-2">
                      <div className="h-8 rounded" style={{ background: 'rgba(0,0,0,0.5)' }} />
                      <div className="text-right">
                        <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>CVV</span>
                        <span className="text-xl font-bold text-white ml-2" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>***</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase mb-1" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Daily Limit</div>
                      <div className="text-lg font-bold text-primary" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>$500.00</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction table */}
        <div className="glass-panel p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}>
            <span className="material-symbols-outlined text-lg">receipt_long</span>
            Transaction Ledger
          </h3>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Timestamp', 'Merchant', 'Agent', 'Amount', 'Status'].map((h) => (
                  <th key={h} className="text-left pb-4 text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif', borderBottom: '1px solid rgba(0,240,255,0.15)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.time} className="hover:bg-[rgba(0,240,255,0.02)] transition-colors">
                  <td className="py-4 text-xs" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B', borderBottom: '1px solid rgba(100,116,139,0.1)' }}>{tx.time}</td>
                  <td className="py-4 text-sm text-white" style={{ borderBottom: '1px solid rgba(100,116,139,0.1)' }}>{tx.merchant}</td>
                  <td className="py-4 text-xs" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B', borderBottom: '1px solid rgba(100,116,139,0.1)' }}>{tx.agent}</td>
                  <td className="py-4 text-sm font-bold" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: tx.ok ? '#E2E8F0' : '#FF0055', borderBottom: '1px solid rgba(100,116,139,0.1)' }}>{tx.amount}</td>
                  <td className="py-4" style={{ borderBottom: '1px solid rgba(100,116,139,0.1)' }}>
                    <span className="text-[10px] font-bold px-2 py-1 rounded" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', background: tx.ok ? 'rgba(57,255,20,0.1)' : 'rgba(255,0,85,0.1)', color: tx.ok ? '#39FF14' : '#FF0055', border: `1px solid ${tx.ok ? 'rgba(57,255,20,0.3)' : 'rgba(255,0,85,0.3)'}` }}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  Search, 
  Download, 
  Filter, 
  Building2, 
  Sparkles,
  ArrowUpRight,
  BarChart2
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, Legend, AreaChart, Area 
} from 'recharts';
import motaData from '../data/motaDisbursementData.json';

export const MotaAnalyticsPage: React.FC = () => {
  const [selectedScheme, setSelectedScheme] = useState<'ALL' | 'PRE_MATRIC' | 'POST_MATRIC'>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'beneficiaries' | 'released' | 'utilized' | 'rate'>('beneficiaries');

  const years = useMemo(() => {
    const set = new Set<string>();
    motaData.nationalYearlyTotals.forEach(r => set.add(r.financialYear));
    return Array.from(set).sort();
  }, []);

  // Filter yearly trend chart data
  const yearlyChartData = useMemo(() => {
    const map = new Map<string, any>();
    motaData.nationalYearlyTotals.forEach(r => {
      if (!map.has(r.financialYear)) {
        map.set(r.financialYear, {
          year: r.financialYear.replace('F.Y. ', '').trim(),
          preReleased: 0,
          preUtilized: 0,
          preBeneficiaries: 0,
          postReleased: 0,
          postUtilized: 0,
          postBeneficiaries: 0,
          totalReleased: 0,
          totalUtilized: 0,
          totalBeneficiaries: 0,
        });
      }
      const item = map.get(r.financialYear);
      if (r.schemeCode === 'PRE_MATRIC') {
        item.preReleased = Math.round(r.fundReleasedCr);
        item.preUtilized = Math.round(r.fundUtilizedCr);
        item.preBeneficiaries = r.beneficiaries;
      } else if (r.schemeCode === 'POST_MATRIC') {
        item.postReleased = Math.round(r.fundReleasedCr);
        item.postUtilized = Math.round(r.fundUtilizedCr);
        item.postBeneficiaries = r.beneficiaries;
      }
      item.totalReleased = Math.round(item.preReleased + item.postReleased);
      item.totalUtilized = Math.round(item.preUtilized + item.postUtilized);
      item.totalBeneficiaries = item.preBeneficiaries + item.postBeneficiaries;
    });

    return Array.from(map.values());
  }, []);

  // State-level data calculation based on filters
  const stateTableData = useMemo(() => {
    let list = motaData.stateAggregates.map(st => {
      let released = st.totalReleased;
      let utilized = st.totalUtilized;
      let beneficiaries = st.totalBeneficiaries;

      if (selectedScheme === 'PRE_MATRIC') {
        released = st.totalPreMatricReleased;
        utilized = st.totalPreMatricUtilized;
        beneficiaries = st.totalPreMatricBeneficiaries;
      } else if (selectedScheme === 'POST_MATRIC') {
        released = st.totalPostMatricReleased;
        utilized = st.totalPostMatricUtilized;
        beneficiaries = st.totalPostMatricBeneficiaries;
      }

      // If specific year selected, recalculate from yearly history
      if (selectedYear !== 'ALL') {
        const yh = st.yearlyHistory?.[selectedYear];
        if (yh) {
          if (selectedScheme === 'PRE_MATRIC') {
            released = yh.preMatric?.released || 0;
            utilized = yh.preMatric?.utilized || 0;
            beneficiaries = yh.preMatric?.beneficiaries || 0;
          } else if (selectedScheme === 'POST_MATRIC') {
            released = yh.postMatric?.released || 0;
            utilized = yh.postMatric?.utilized || 0;
            beneficiaries = yh.postMatric?.beneficiaries || 0;
          } else {
            released = (yh.preMatric?.released || 0) + (yh.postMatric?.released || 0);
            utilized = (yh.preMatric?.utilized || 0) + (yh.postMatric?.utilized || 0);
            beneficiaries = (yh.preMatric?.beneficiaries || 0) + (yh.postMatric?.beneficiaries || 0);
          }
        } else {
          released = 0;
          utilized = 0;
          beneficiaries = 0;
        }
      }

      const rate = released > 0 ? Math.min(100, Math.round((utilized / released) * 1000) / 10) : 0;

      return {
        state: st.state,
        released: Math.round(released * 100) / 100,
        utilized: Math.round(utilized * 100) / 100,
        beneficiaries,
        rate,
      };
    });

    if (searchQuery.trim()) {
      list = list.filter(item => 
        item.state.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'released') return b.released - a.released;
      if (sortBy === 'utilized') return b.utilized - a.utilized;
      if (sortBy === 'rate') return b.rate - a.rate;
      return b.beneficiaries - a.beneficiaries;
    });

    return list;
  }, [selectedScheme, selectedYear, searchQuery, sortBy]);

  // Overall totals across current view
  const currentTotals = useMemo(() => {
    return stateTableData.reduce(
      (acc, s) => ({
        beneficiaries: acc.beneficiaries + s.beneficiaries,
        released: acc.released + s.released,
        utilized: acc.utilized + s.utilized,
      }),
      { beneficiaries: 0, released: 0, utilized: 0 }
    );
  }, [stateTableData]);

  const avgUtilization = currentTotals.released > 0 
    ? Math.round((currentTotals.utilized / currentTotals.released) * 1000) / 10 
    : 0;

  const exportCSV = () => {
    const header = ['State/UT', 'Beneficiaries', 'Fund Released (Cr)', 'Fund Utilized (Cr)', 'Utilization Rate (%)'];
    const rows = stateTableData.map(s => [
      `"${s.state}"`,
      s.beneficiaries,
      s.released,
      s.utilized,
      `${s.rate}%`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [header.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MoTA_Scholarship_Data_${selectedScheme}_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E8E3DC] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
                Official Ministry Dataset
              </span>
              <span className="text-xs text-[#666666]">Annexure-I • 2013-14 to 2025-26</span>
            </div>
            <h1 className="text-2xl font-bold text-charcoal mt-1.5">
              Ministry of Tribal Affairs (MoTA) National Fund & Beneficiary Repository
            </h1>
            <p className="text-sm text-[#666666] mt-1 max-w-3xl">
              Audited historical disbursement, fund release, and beneficiary numbers for Pre-Matric & Post-Matric Scholarship Schemes across 33 States and Union Territories.
            </p>
          </div>
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#D2CBBF] hover:bg-[#F3F1EE] text-charcoal text-xs font-semibold rounded-lg shadow-xs transition-colors self-start md:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span>Export Dataset (CSV)</span>
          </button>
        </div>

        {/* Global Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-[#E8E3DC]">
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">Scholarship Scheme</label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value as any)}
              className="w-full text-xs px-3 py-2 bg-[#F9F7F4] border border-[#D2CBBF] rounded-lg font-medium text-charcoal focus:outline-none focus:border-primary"
            >
              <option value="ALL">All Schemes (Pre-Matric + Post-Matric)</option>
              <option value="POST_MATRIC">Post-Matric Scholarship for ST Students</option>
              <option value="PRE_MATRIC">Pre-Matric Scholarship for ST Students</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">Financial Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-[#F9F7F4] border border-[#D2CBBF] rounded-lg font-medium text-charcoal focus:outline-none focus:border-primary"
            >
              <option value="ALL">Cumulative (All 13 Financial Years)</option>
              {years.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">Sort State Ranking By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs px-3 py-2 bg-[#F9F7F4] border border-[#D2CBBF] rounded-lg font-medium text-charcoal focus:outline-none focus:border-primary"
            >
              <option value="beneficiaries">Total Beneficiary Students (Highest first)</option>
              <option value="released">Fund Released in ₹ Crores</option>
              <option value="utilized">Fund Utilized in ₹ Crores</option>
              <option value="rate">Utilization Efficiency %</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E8E3DC] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-semibold uppercase">Total ST Beneficiaries</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-charcoal">
            {currentTotals.beneficiaries.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{(currentTotals.beneficiaries / 10000000).toFixed(2)} Crore ST students supported</span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E3DC] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-semibold uppercase">Total Funds Released</span>
            <CreditCard className="w-4 h-4 text-[#2A7C6F]" />
          </div>
          <div className="text-2xl font-bold text-charcoal">
            ₹{Math.round(currentTotals.released).toLocaleString()} Cr
          </div>
          <div className="text-[11px] text-[#666666] mt-1">
            Direct Central MoTA allocation
          </div>
        </div>

        <div className="bg-white border border-[#E8E3DC] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-semibold uppercase">Total Funds Utilized</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-charcoal">
            ₹{Math.round(currentTotals.utilized).toLocaleString()} Cr
          </div>
          <div className="text-[11px] text-blue-700 mt-1 font-medium">
            Disbursed by States & UTs
          </div>
        </div>

        <div className="bg-white border border-[#E8E3DC] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-semibold uppercase">Average Utilization Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-charcoal">
            {avgUtilization}%
          </div>
          <div className="text-[11px] text-[#666666] mt-1">
            Fund absorption efficiency
          </div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Longitudinal Funds Chart */}
        <div className="bg-white border border-[#E8E3DC] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-charcoal">National Funds: Released vs Utilized (₹ in Crores)</h2>
              <p className="text-xs text-[#666666]">Longitudinal trend from 2013-14 to 2025-26</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyChartData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E3DC" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 10, fill: '#666666' }} 
                  angle={-30} 
                  textAnchor="end" 
                />
                <YAxis tick={{ fontSize: 10, fill: '#666666' }} />
                <Tooltip 
                  formatter={(val: any) => [`₹${val} Cr`, '']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: 8, borderColor: '#E8E3DC', fontSize: 12 }} 
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="totalReleased" name="Funds Released" fill="#1A5C38" radius={[4, 4, 0, 0]} />
                <Bar dataKey="totalUtilized" name="Funds Utilized" fill="#D4860A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Beneficiary Growth Chart */}
        <div className="bg-white border border-[#E8E3DC] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-charcoal">Annual ST Beneficiary Reach (Students)</h2>
              <p className="text-xs text-[#666666]">Pre-Matric vs Post-Matric distribution</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyChartData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <defs>
                  <linearGradient id="colorPost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A7C6F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2A7C6F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPre" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4860A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4860A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E3DC" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 10, fill: '#666666' }} 
                  angle={-30} 
                  textAnchor="end" 
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#666666' }}
                  tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  formatter={(val: any) => [Number(val).toLocaleString() + ' students', '']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: 8, borderColor: '#E8E3DC', fontSize: 12 }} 
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Area type="monotone" dataKey="postBeneficiaries" name="Post-Matric (College)" stroke="#2A7C6F" fillOpacity={1} fill="url(#colorPost)" />
                <Area type="monotone" dataKey="preBeneficiaries" name="Pre-Matric (School)" stroke="#D4860A" fillOpacity={1} fill="url(#colorPre)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* State-by-State Detailed Table */}
      <div className="bg-white border border-[#E8E3DC] rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E8E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-charcoal">State & Union Territory Performance Table</h2>
            <p className="text-xs text-[#666666] mt-0.5">
              Showing {stateTableData.length} States & UTs ({selectedScheme} • {selectedYear})
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#888888]" />
            <input
              type="text"
              placeholder="Search state name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F9F7F4] border border-[#D2CBBF] rounded-lg text-charcoal placeholder-[#888888] focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal">
            <thead className="bg-[#FAF9F7] text-[#666666] uppercase text-[10px] font-bold border-b border-[#E8E3DC]">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">State / UT</th>
                <th className="py-3 px-4 text-right">Beneficiaries</th>
                <th className="py-3 px-4 text-right">Fund Released</th>
                <th className="py-3 px-4 text-right">Fund Utilized</th>
                <th className="py-3 px-4">Utilization %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E3DC]">
              {stateTableData.map((item, idx) => (
                <tr key={item.state} className="hover:bg-[#F9F7F4] transition-colors">
                  <td className="py-3 px-4 font-mono text-[#888888]">{idx + 1}</td>
                  <td className="py-3 px-4 font-semibold text-charcoal">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-primary" />
                      <span>{item.state}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-charcoal">
                    {item.beneficiaries.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[#444444]">
                    ₹{item.released.toLocaleString()} Cr
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-800 font-semibold">
                    ₹{item.utilized.toLocaleString()} Cr
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full ${
                            item.rate >= 90 ? 'bg-emerald-600' :
                            item.rate >= 75 ? 'bg-primary' :
                            item.rate >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, item.rate)}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-[#555555]">
                        {item.rate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

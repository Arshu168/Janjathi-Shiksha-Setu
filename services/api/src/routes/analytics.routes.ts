import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../utils/prisma';
import { success } from '../utils/response';

interface StatsQuery {
  schemeCode?: string;
  financialYear?: string;
  state?: string;
}

export async function analyticsRoutes(app: FastifyInstance) {
  // Publicly queryable official MoTA analytics endpoint
  app.get('/ministry-stats', async (request: FastifyRequest<{ Querystring: StatsQuery }>, reply: FastifyReply) => {
    const { schemeCode, financialYear, state } = request.query;

    const where: any = {};
    if (schemeCode) where.schemeCode = schemeCode;
    if (financialYear) where.financialYear = financialYear;
    if (state) where.state = state;

    // Fetch records
    const records = await prisma.ministryDisbursementStat.findMany({
      where,
      orderBy: [{ financialYear: 'asc' }, { state: 'asc' }],
    });

    // National Yearly Totals (from total rows)
    const nationalTotals = await prisma.ministryDisbursementStat.findMany({
      where: {
        isTotalRow: true,
        ...(schemeCode ? { schemeCode } : {}),
      },
      orderBy: { financialYear: 'asc' },
    });

    // Aggregate summary
    const nationalPreMatric = nationalTotals.filter(t => t.schemeCode === 'PRE_MATRIC');
    const nationalPostMatric = nationalTotals.filter(t => t.schemeCode === 'POST_MATRIC');

    const totalReleased = nationalTotals.reduce((sum, r) => sum + r.fundReleasedCr, 0);
    const totalUtilized = nationalTotals.reduce((sum, r) => sum + r.fundUtilizedCr, 0);
    const totalBeneficiaries = nationalTotals.reduce((sum, r) => sum + r.beneficiaries, 0);

    // Group national yearly comparison (Pre + Post combined)
    const yearlyMap = new Map<string, {
      year: string;
      preMatricReleased: number;
      preMatricUtilized: number;
      preMatricBeneficiaries: number;
      postMatricReleased: number;
      postMatricUtilized: number;
      postMatricBeneficiaries: number;
      totalReleased: number;
      totalUtilized: number;
      totalBeneficiaries: number;
    }>();

    for (const r of nationalTotals) {
      if (!yearlyMap.has(r.financialYear)) {
        yearlyMap.set(r.financialYear, {
          year: r.financialYear,
          preMatricReleased: 0,
          preMatricUtilized: 0,
          preMatricBeneficiaries: 0,
          postMatricReleased: 0,
          postMatricUtilized: 0,
          postMatricBeneficiaries: 0,
          totalReleased: 0,
          totalUtilized: 0,
          totalBeneficiaries: 0,
        });
      }
      const entry = yearlyMap.get(r.financialYear)!;
      if (r.schemeCode === 'PRE_MATRIC') {
        entry.preMatricReleased = r.fundReleasedCr;
        entry.preMatricUtilized = r.fundUtilizedCr;
        entry.preMatricBeneficiaries = r.beneficiaries;
      } else {
        entry.postMatricReleased = r.fundReleasedCr;
        entry.postMatricUtilized = r.fundUtilizedCr;
        entry.postMatricBeneficiaries = r.beneficiaries;
      }
      entry.totalReleased = Math.round((entry.preMatricReleased + entry.postMatricReleased) * 100) / 100;
      entry.totalUtilized = Math.round((entry.preMatricUtilized + entry.postMatricUtilized) * 100) / 100;
      entry.totalBeneficiaries = entry.preMatricBeneficiaries + entry.postMatricBeneficiaries;
    }

    // State Leaderboard
    const nonTotalRecords = await prisma.ministryDisbursementStat.findMany({
      where: {
        isTotalRow: false,
        ...(schemeCode ? { schemeCode } : {}),
        ...(financialYear ? { financialYear } : {}),
      },
    });

    const stateMap = new Map<string, {
      state: string;
      totalReleased: number;
      totalUtilized: number;
      totalBeneficiaries: number;
      preMatricBeneficiaries: number;
      postMatricBeneficiaries: number;
      utilizationRate: number;
    }>();

    for (const r of nonTotalRecords) {
      if (!stateMap.has(r.state)) {
        stateMap.set(r.state, {
          state: r.state,
          totalReleased: 0,
          totalUtilized: 0,
          totalBeneficiaries: 0,
          preMatricBeneficiaries: 0,
          postMatricBeneficiaries: 0,
          utilizationRate: 0,
        });
      }
      const st = stateMap.get(r.state)!;
      st.totalReleased += r.fundReleasedCr;
      st.totalUtilized += r.fundUtilizedCr;
      st.totalBeneficiaries += r.beneficiaries;
      if (r.schemeCode === 'PRE_MATRIC') {
        st.preMatricBeneficiaries += r.beneficiaries;
      } else {
        st.postMatricBeneficiaries += r.beneficiaries;
      }
    }

    const stateLeaderboard = Array.from(stateMap.values()).map(st => ({
      ...st,
      totalReleased: Math.round(st.totalReleased * 100) / 100,
      totalUtilized: Math.round(st.totalUtilized * 100) / 100,
      utilizationRate: st.totalReleased > 0 ? Math.round((st.totalUtilized / st.totalReleased) * 1000) / 10 : 0,
    })).sort((a, b) => b.totalBeneficiaries - a.totalBeneficiaries);

    return reply.send(success({
      meta: {
        source: 'Ministry of Tribal Affairs (MoTA), Government of India',
        annexure: 'Annexure I (2013-14 to 2025-26)',
        totalRecords: records.length,
      },
      summary: {
        totalReleasedCr: Math.round(totalReleased * 100) / 100,
        totalUtilizedCr: Math.round(totalUtilized * 100) / 100,
        totalBeneficiaries,
        overallUtilizationRate: Math.round((totalUtilized / totalReleased) * 1000) / 10,
        preMatric: {
          releasedCr: Math.round(nationalPreMatric.reduce((s, r) => s + r.fundReleasedCr, 0) * 100) / 100,
          utilizedCr: Math.round(nationalPreMatric.reduce((s, r) => s + r.fundUtilizedCr, 0) * 100) / 100,
          beneficiaries: nationalPreMatric.reduce((s, r) => s + r.beneficiaries, 0),
        },
        postMatric: {
          releasedCr: Math.round(nationalPostMatric.reduce((s, r) => s + r.fundReleasedCr, 0) * 100) / 100,
          utilizedCr: Math.round(nationalPostMatric.reduce((s, r) => s + r.fundUtilizedCr, 0) * 100) / 100,
          beneficiaries: nationalPostMatric.reduce((s, r) => s + r.beneficiaries, 0),
        },
      },
      yearlyTrends: Array.from(yearlyMap.values()),
      stateLeaderboard,
      records: records.slice(0, 100), // First 100 matching rows
    }));
  });
}

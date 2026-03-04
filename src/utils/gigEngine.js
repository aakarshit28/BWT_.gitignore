import mockData from '../data/mockTransactions.json';

/**
 * Calculates a Stability Score for a gig worker based on their transaction history.
 * @param {Array} transactions 
 * @returns {Object} { score, avgMonthlyGigIncome, burnRate }
 */
export const calculateGigScore = (transactions = mockData) => {
    const GIG_KEYWORDS = /ZOMATO|SWIGGY-PAYOUT|ZEPTO|BLINKIT/i;

    // 1. Filter Gig Income
    const gigIncomes = transactions.filter(t => t.type === 'CREDIT' && GIG_KEYWORDS.test(t.narration));
    const totalGigIncome = gigIncomes.reduce((sum, t) => sum + t.amount, 0);

    // 2. Calculate Burn Rate (Total Debits)
    const totalDebits = transactions
        .filter(t => t.type === 'DEBIT')
        .reduce((sum, t) => sum + t.amount, 0);

    // 3. Consistency (Number of specific days worked out of 90)
    const uniqueDaysWorked = new Set(gigIncomes.map(t => new Date(t.date).toDateString())).size;
    const consistencyPercent = (uniqueDaysWorked / 90) * 100;

    // 4. Generate Score
    // Base 300 + (Consistency % * 3) + (Total Gig Income / 150) - (Burn Rate penalty if debits exceed 90% of income)
    let score = 300;
    score += (consistencyPercent * 3);
    score += (totalGigIncome / 150);

    if (totalDebits > (totalGigIncome * 0.9)) {
        score -= 50; // Penalty
    }

    // Cap score at 850
    score = Math.min(Math.max(Math.round(score), 300), 850);

    const avgMonthlyGigIncome = Math.round(totalGigIncome / 3);

    return {
        score,
        avgMonthlyGigIncome,
        burnRate: totalDebits
    };
};

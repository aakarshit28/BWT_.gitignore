import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GIG_KEYWORDS = ["ZOMATO", "SWIGGY-PAYOUT", "ZEPTO", "BLINKIT"];
const EXPENSE_KEYWORDS = ["Rent", "Petrol", "Chai", "Groceries", "Mobile Recharge", "Electricity Bill", "Snacks"];

const generateMockData = () => {
    const transactions = [];
    const today = new Date();
    let idCounter = 1;

    for (let i = 0; i < 90; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() - i);
        const dateStr = currentDate.toISOString();

        // Randomize if gig work occurred on this day (approx 70% chance)
        if (Math.random() > 0.3) {
            // 1-3 payouts per day
            const numPayouts = Math.floor(Math.random() * 3) + 1;
            for (let j = 0; j < numPayouts; j++) {
                transactions.push({
                    id: `TXN-GIG-${idCounter++}`,
                    date: dateStr,
                    amount: Math.floor(Math.random() * 500) + 200, // 200 - 700 INR
                    narration: GIG_KEYWORDS[Math.floor(Math.random() * GIG_KEYWORDS.length)],
                    type: 'CREDIT'
                });
            }
        }

        // Daily expenses
        const numExpenses = Math.floor(Math.random() * 4) + 1; // 1-4 expenses a day
        for (let j = 0; j < numExpenses; j++) {
            const isRent = i === 1 || i === 31 || i === 61; // Simulate rent once a month
            let amount = Math.floor(Math.random() * 300) + 20; // 20 - 320 INR
            let narration = EXPENSE_KEYWORDS[Math.floor(Math.random() * EXPENSE_KEYWORDS.length)];

            if (isRent && j === 0) {
                amount = Math.floor(Math.random() * 5000) + 3000;
                narration = "Rent Transfer";
            }

            transactions.push({
                id: `TXN-EXP-${idCounter++}`,
                date: dateStr,
                amount: amount,
                narration: narration,
                type: 'DEBIT'
            });
        }
    }

    // Sort by date ascending (oldest first)
    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    fs.writeFileSync(
        path.join(__dirname, 'mockTransactions.json'),
        JSON.stringify(transactions, null, 2)
    );

    console.log(`Generated ${transactions.length} mock transactions.`);
};

generateMockData();

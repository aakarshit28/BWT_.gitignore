# CashFlow Passport

### Transforming Financial Behavior into Verified Identity
**Built for the Build with TRAE Hackathon | Challenge Track: Future Finance Platforms**

## Project Overview
The "Invisible 400 Million" refers to India’s gig-economy workforce including delivery partners, street vendors, and freelancers. Despite maintaining consistent daily cash flow via UPI, these individuals remain credit-invisible to formal banking institutions due to the lack of traditional documentation like salary slips or Form 16.

**CashFlow Passport** serves as a financial middleware that analyzes raw, unstructured UPI transaction history to build a verifiable digital identity. By calculating earning consistency and cash-flow velocity, we provide a "Passport" that proves creditworthiness while maintaining strict user privacy.

---

## Core Features
- **AA Protocol Integration (Simulated):** Leverages the Account Aggregator framework concepts to fetch consent-based financial data securely.
- **Contextual Intent Engine:** Advanced keyword-based filtering to distinguish between gig-economy earnings (e.g., Zomato, Swiggy, Zepto, Blinkit) and personal P2P transfers.
- **Dynamic Stability Scoring:** A specialized scoring model (ranging from 300 to 850) that prioritizes earning regularity over absolute volume.
- **Privacy-Preserving Verification:** Generates a unique QR-coded identity. Lenders can verify the health score without accessing sensitive line-by-line transaction details.
- **Real-Time Verification Portal:** A dual-sided interface for workers to generate passports and lenders to instantly validate them via Firebase real-time synchronization.

---

## Technical Architecture

### The Stack
- **Frontend:** React 19, Vite, Tailwind CSS
- **Animations:** Framer Motion
- **Database/Backend:** Firebase Firestore
- **Development Environment:** TRAE AI IDE
- **Data Source:** Mocked Setu Account Aggregator JSON datasets

- [1. USER CONSENT] <---- (User interacts) ----> (Simulated Account Aggregator UI)
              |
              | (Consent Granted)
              V
[2. DATA INGESTION LAYER] <--- [Setu AA Sandbox (MOCK DATA)]
       (Raw JSON Response)
              |
              | (Data Flow)
              V
  [3. THE INTENT ENGINE]  --- (TRAE Logic) ---> [Contextual Filters]
      (Processing Layer)                       - Gig-Income (Zomato/Swiggy)
                                               - Daily Cash Flow Velocity
                                               - Consistency Check
              |
              | (Normalized Data)
              V
[4. IDENTITY & VERIFICATION] --- (Data Persistence) ---> [Firebase Firestore]
      (Output Layer)                                     (Stores only the Score/Metadata)
              |
              | (Handshake)
              V
    [5. LENDER DASHBOARD] <--- (QR Scan) ---> (Worker's CashFlow Passport UI)
                                            - (Lender scans dynamic QR)

### The Scoring Methodology
The Financial Health Score is calculated using a weighted behavioral algorithm:

$$Score = 300 + (\text{Consistency Percentage} \times 3) + \frac{\text{Monthly Gig Volume}}{150}$$

- **Consistency:** The percentage of days within a 30-day window containing at least one verified gig-income credit.
- **Velocity:** The frequency of micro-credits indicating active participation in the gig economy.

---

## Impact and Innovation
- **Financial Inclusion:** Directly addresses the "Invisible 400 Million" by converting digital behavior into a formal credit asset.
- **Zero-Knowledge Principle:** Implements a design where the lender only receives the necessary verification status, protecting the worker's spending habits.
- **Scalability:** Designed to interface with any UPI-enabled bank statement in the Indian financial ecosystem.

---

## Installation and Execution
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/hardbuilder/BWT_.gitignore.git]

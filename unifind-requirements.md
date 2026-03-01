# UniFind Pakistan — Complete Project Requirements
> Pakistan's #1 Free University Discovery Platform
> Developer: Gohar Zaib Gill | Version 1.0 | June 2026

---

## PROJECT OVERVIEW

Build a full-stack web application called **UniFind Pakistan** — a free platform helping Pakistani students and parents discover, compare, and understand university admissions across Pakistan.

**Mission:** Every student deserves equal access to university information, regardless of background.

---

## TECH STACK

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Google + Email) |
| Frontend Hosting | Netlify |
| Backend Hosting | Railway |

---

## DESIGN SYSTEM

```
Primary Color:    #1a5276  (Dark Blue)
Secondary Color:  #27ae60  (Green)
Accent Color:     #f39c12  (Gold)
Background:       #f8f9fa  (Light Gray)
White:            #ffffff
Dark Text:        #2c3e50
Muted Text:       #7f8c8d

Font: Poppins (Google Fonts) — weights 400, 500, 600, 700

Card Style: Glassmorphism
  - backdrop-filter: blur(10px)
  - background: rgba(255, 255, 255, 0.85)
  - border: 1px solid rgba(255,255,255,0.3)
  - border-radius: 16px
  - box-shadow: 0 8px 32px rgba(0,0,0,0.1)

Hover Effect on Cards:
  - transform: translateY(-4px)
  - box-shadow: 0 16px 40px rgba(0,0,0,0.15)
  - transition: all 0.3s ease

Button Style:
  - Primary: bg #1a5276, white text, rounded-lg, hover darken
  - Secondary: border #1a5276, blue text, hover bg light blue
  - Success: bg #27ae60, white text
```

---

## FOLDER STRUCTURE

```
unifind-pakistan/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── UniversityCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── CompareBar.jsx
│   │   │   ├── CompareModal.jsx
│   │   │   └── ReviewCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Universities.jsx
│   │   │   ├── UniversityDetail.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── MeritCalculator.jsx
│   │   │   ├── Scholarships.jsx
│   │   │   ├── AdmissionTracker.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Profile.jsx
│   │   ├── data/
│   │   │   └── universities.js
│   │   ├── context/
│   │   │   └── CompareContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
└── backend/
    ├── routes/
    │   ├── universities.js
    │   ├── reviews.js
    │   ├── scholarships.js
    │   └── auth.js
    ├── middleware/
    │   └── auth.js
    ├── supabase/
    │   └── client.js
    ├── server.js
    └── package.json
```

---

## PAGES & ROUTES

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Hero, search, featured universities, stats |
| `/universities` | University Listing | All universities with filters & search |
| `/universities/:id` | University Detail | Full info, programs, reviews |
| `/compare` | Compare | Side by side comparison table |
| `/merit-calculator` | Merit Calculator | Aggregate calculator + eligibility |
| `/scholarships` | Scholarships | All scholarship listings |
| `/admissions` | Admission Tracker | Deadlines calendar |
| `/login` | Login/Signup | Auth page |
| `/profile` | Student Profile | Saved unis, history |
| `/admin` | Admin Dashboard | Manage all data (protected) |

---

## PAGE DETAILS

### 1. HOMEPAGE (`/`)

**Navbar:**
- Logo: UniFind Pakistan (blue + green)
- Links: Home, Universities, Compare, Merit Calculator, Scholarships, Admissions
- Login button (top right)
- Mobile hamburger menu
- Sticky on scroll with shadow

**Hero Section:**
- Big heading: "Find Your Perfect University in Pakistan"
- Subheading: "Compare 15+ universities, calculate your merit, and apply with confidence — completely free."
- Large search bar (center, full width on mobile)
- Search placeholder: "Search universities, programs, cities..."
- Stats row below search:
  - 15+ Universities
  - 50+ Programs
  - 6 Cities
  - 100% Free

**Featured Universities Section:**
- Heading: "Top Universities in Pakistan"
- Horizontal scrollable cards on mobile, 3-column grid on desktop
- Show top 6 universities by HEC ranking
- Each card: initials avatar, name, city, ranking badge, fee, rating, View button

**How It Works Section:**
- 3 steps with icons:
  1. Search — "Enter your city, program, or university name"
  2. Compare — "Compare universities side by side"
  3. Apply — "Follow our step-by-step admission guide"

**Scholarship Banner:**
- Full width banner: "Don't miss scholarship deadlines!"
- Button: View Scholarships

**Footer:**
- Logo + tagline
- Quick links: Universities, Compare, Merit Calculator, Scholarships
- Made with love for Pakistani students
- Copyright 2026 UniFind Pakistan

---

### 2. UNIVERSITY LISTING (`/universities`)

**Filter Bar (sticky below navbar):**
- Search input (real-time filter)
- City dropdown: All Cities, Islamabad, Lahore, Karachi, Faisalabad, Peshawar, Multan, Jamshoro, Sargodha
- Sector toggle: All | Public | Private
- Program dropdown: All, CS, Engineering, Business, Medical, Arts, Law
- Fee Range dropdown: All, Under 50k, 50k-100k, 100k-200k, 200k+
- Sort by: Ranking, Fee Low-High, Fee High-Low, Rating
- Results count: "Showing 12 universities"
- Clear filters button

**University Cards Grid:**
- 3 columns desktop, 2 tablet, 1 mobile
- Each card contains:
  - Top: Initials avatar (colored circle) + HEC Ranking badge (top right)
  - University name (bold, 18px)
  - City + Sector badge (Public=green, Private=blue)
  - Fee: "Rs. 45,000 / semester"
  - Programs: up to 3 pill tags (CS, Engineering, Business...)
  - Rating: stars + "(24 reviews)"
  - Bottom: "Add to Compare" checkbox button + "View Details" blue button
  - Hover: card lifts up with shadow

**Compare Floating Bar:**
- Fixed bottom bar (hidden by default)
- Appears when 1+ university selected
- Shows: selected university avatars + names
- "Compare Now" button (disabled until 2 selected)
- "Clear" button
- Max 3 universities

**Empty State:**
- Illustration placeholder
- "No universities found"
- "Try adjusting your filters"
- Clear filters button

---

### 3. UNIVERSITY DETAIL (`/universities/:id`)

**Header:**
- Large initials avatar
- University name + abbreviation
- City | Sector | HEC Ranking #X
- Rating stars + review count
- Buttons: Save (heart icon) | Share | Visit Website

**Tab Navigation:**
- Overview | Programs & Fees | Admission Process | Scholarships | Reviews

**Overview Tab:**
- University description (2-3 paragraphs)
- Key facts grid: Founded, Sector, Campus Size, Total Students, Faculty Count
- Facilities: Hostel (yes/no), Transport, Labs, Library, Sports, Cafeteria

**Programs & Fees Tab:**
- Table: Program Name | Duration | Fee per Semester | Total Fee
- Filter by department

**Admission Process Tab:**
- Step by step process (numbered list with icons):
  1. Check eligibility (marks required)
  2. Fill online application
  3. Upload documents (list of required docs)
  4. Pay application fee
  5. Appear for entry test (if required)
  6. Wait for merit list
  7. Pay semester fee and get enrolled
- Important dates table: Application Open | Application Close | Entry Test | Merit List | Classes Start

**Reviews Tab:**
- Overall rating breakdown (5 categories)
- List of student reviews
- Write a review (if logged in)

---

### 4. MERIT CALCULATOR (`/merit-calculator`)

**Input Form:**
- Matric marks: obtained / total (e.g. 980/1100)
- FSc marks: obtained / total (e.g. 900/1100)
- Entry test score: percentage (optional)
- Program type: Engineering / CS / Business / Medical / Arts

**Calculate Button**

**Results:**
- Aggregate percentage (large, animated number)
- Formula shown: "Matric 10% + FSc 40% + Entry Test 50%"
- University eligibility list:
  - Green card: "Likely Eligible" — NUST, FAST, COMSATS...
  - Yellow card: "Borderline" — GCU, UCP...
  - Red card: "Below Merit" — ...
- "Save Results" button (if logged in)

---

### 5. SCHOLARSHIPS (`/scholarships`)

**Filter Bar:**
- Search by name
- Filter by: Province, University, Program, Income Level

**Scholarship Cards:**
- Scholarship name + logo placeholder
- Amount: "Rs. 50,000 / year" or "Full Tuition"
- Provider: HEC / Government / University
- Eligibility summary
- Deadline: with countdown days remaining
- "Apply Now" button → official link

**Scholarships to include:**
- HEC Need Based Scholarships
- Ehsaas Undergraduate Scholarship
- Punjab Educational Endowment Fund (PEEF)
- Honhaar Scholarship Program
- NUST Financial Aid
- LUMS Financial Aid
- Aga Khan Foundation Scholarship
- Prime Minister's Laptop Scheme (bonus)

---

### 6. ADMISSION TRACKER (`/admissions`)

**Calendar View:**
- Month selector
- Each day shows: university name if deadline falls on that day
- Color coded: Application Open (green), Application Close (red), Merit List (blue)

**List View:**
- Toggle between Calendar / List view
- Sorted by upcoming deadlines
- Each row: University | Program | Deadline Type | Date | Days Remaining
- "Set Reminder" button (saves to profile if logged in)

---

### 7. LOGIN (`/login`)

- Clean centered card
- "Continue with Google" button (primary)
- Divider "or"
- Email + Password fields
- Login button
- "Don't have account? Sign up"
- Forgot password link

---

## UNIVERSITIES DATA

Hardcode this data in `src/data/universities.js`:

```javascript
export const universities = [
  {
    id: 1,
    name: "National University of Sciences and Technology",
    abbreviation: "NUST",
    city: "Islamabad",
    sector: "Public",
    hec_ranking: 1,
    fee_per_semester: 45000,
    programs: ["Engineering", "CS", "Business", "Architecture"],
    rating: 4.8,
    reviews_count: 342,
    description: "NUST is Pakistan's top-ranked university known for engineering and technology programs.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://nust.edu.pk",
    color: "#1a5276"
  },
  {
    id: 2,
    name: "FAST National University",
    abbreviation: "FAST-NUCES",
    city: "Islamabad",
    sector: "Private",
    hec_ranking: 4,
    fee_per_semester: 75000,
    programs: ["CS", "Engineering", "Business"],
    rating: 4.6,
    reviews_count: 215,
    description: "FAST is Pakistan's leading CS and IT university with campuses in 5 cities.",
    facilities: { hostel: true, transport: false, labs: true, library: true, sports: false },
    website: "https://nu.edu.pk",
    color: "#922b21"
  },
  {
    id: 3,
    name: "COMSATS University Islamabad",
    abbreviation: "COMSATS",
    city: "Islamabad",
    sector: "Public",
    hec_ranking: 3,
    fee_per_semester: 38000,
    programs: ["CS", "Engineering", "Business", "Sciences"],
    rating: 4.3,
    reviews_count: 178,
    description: "COMSATS is a leading public university with campuses across Pakistan.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://comsats.edu.pk",
    color: "#1e8449"
  },
  {
    id: 4,
    name: "University of Engineering and Technology",
    abbreviation: "UET Lahore",
    city: "Lahore",
    sector: "Public",
    hec_ranking: 5,
    fee_per_semester: 32000,
    programs: ["Engineering", "Architecture", "Sciences"],
    rating: 4.4,
    reviews_count: 289,
    description: "UET Lahore is Pakistan's oldest and most prestigious engineering university.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://uet.edu.pk",
    color: "#7d3c98"
  },
  {
    id: 5,
    name: "Lahore University of Management Sciences",
    abbreviation: "LUMS",
    city: "Lahore",
    sector: "Private",
    hec_ranking: 2,
    fee_per_semester: 185000,
    programs: ["Business", "CS", "Law", "Arts", "Sciences"],
    rating: 4.9,
    reviews_count: 412,
    description: "LUMS is Pakistan's premier private university known for business and liberal arts.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://lums.edu.pk",
    color: "#d35400"
  },
  {
    id: 6,
    name: "Institute of Business Administration",
    abbreviation: "IBA Karachi",
    city: "Karachi",
    sector: "Public",
    hec_ranking: 6,
    fee_per_semester: 55000,
    programs: ["Business", "CS", "Economics"],
    rating: 4.7,
    reviews_count: 198,
    description: "IBA Karachi is Pakistan's oldest business school established in 1955.",
    facilities: { hostel: true, transport: false, labs: true, library: true, sports: false },
    website: "https://iba.edu.pk",
    color: "#117a65"
  },
  {
    id: 7,
    name: "Superior University",
    abbreviation: "Superior",
    city: "Faisalabad",
    sector: "Private",
    hec_ranking: 18,
    fee_per_semester: 42000,
    programs: ["CS", "Engineering", "Business", "Arts"],
    rating: 4.1,
    reviews_count: 124,
    description: "Superior University is a leading private university in Central Punjab known for quality education.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://superior.edu.pk",
    color: "#1a5276"
  },
  {
    id: 8,
    name: "Government College University",
    abbreviation: "GCU Lahore",
    city: "Lahore",
    sector: "Public",
    hec_ranking: 9,
    fee_per_semester: 18000,
    programs: ["Arts", "Sciences", "CS", "Business"],
    rating: 4.2,
    reviews_count: 167,
    description: "GCU Lahore is one of Pakistan's oldest universities with a rich academic heritage.",
    facilities: { hostel: true, transport: false, labs: true, library: true, sports: true },
    website: "https://gcu.edu.pk",
    color: "#1a5276"
  },
  {
    id: 9,
    name: "University of Central Punjab",
    abbreviation: "UCP",
    city: "Lahore",
    sector: "Private",
    hec_ranking: 14,
    fee_per_semester: 65000,
    programs: ["Business", "CS", "Law", "Engineering"],
    rating: 4.0,
    reviews_count: 98,
    description: "UCP is a modern private university in Lahore offering diverse programs.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: false },
    website: "https://ucp.edu.pk",
    color: "#6c3483"
  },
  {
    id: 10,
    name: "Air University",
    abbreviation: "AU",
    city: "Islamabad",
    sector: "Public",
    hec_ranking: 11,
    fee_per_semester: 48000,
    programs: ["Engineering", "CS", "Business", "Sciences"],
    rating: 4.3,
    reviews_count: 143,
    description: "Air University is a public sector university established by Pakistan Air Force.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://au.edu.pk",
    color: "#1f618d"
  },
  {
    id: 11,
    name: "Quaid-i-Azam University",
    abbreviation: "QAU",
    city: "Islamabad",
    sector: "Public",
    hec_ranking: 7,
    fee_per_semester: 15000,
    programs: ["Sciences", "Arts", "Business", "Law"],
    rating: 4.1,
    reviews_count: 156,
    description: "QAU is a leading research university named after the founder of Pakistan.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://qau.edu.pk",
    color: "#145a32"
  },
  {
    id: 12,
    name: "NED University of Engineering",
    abbreviation: "NED",
    city: "Karachi",
    sector: "Public",
    hec_ranking: 8,
    fee_per_semester: 22000,
    programs: ["Engineering", "Architecture", "CS"],
    rating: 4.3,
    reviews_count: 201,
    description: "NED is one of Pakistan's oldest and most prestigious engineering universities.",
    facilities: { hostel: true, transport: false, labs: true, library: true, sports: true },
    website: "https://neduet.edu.pk",
    color: "#78281f"
  },
  {
    id: 13,
    name: "Bahauddin Zakariya University",
    abbreviation: "BZU",
    city: "Multan",
    sector: "Public",
    hec_ranking: 16,
    fee_per_semester: 14000,
    programs: ["Arts", "Sciences", "Business", "Law", "Engineering"],
    rating: 3.9,
    reviews_count: 87,
    description: "BZU is the largest university in South Punjab serving thousands of students.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: true },
    website: "https://bzu.edu.pk",
    color: "#7e5109"
  },
  {
    id: 14,
    name: "Mehran University of Engineering",
    abbreviation: "MUET",
    city: "Jamshoro",
    sector: "Public",
    hec_ranking: 12,
    fee_per_semester: 20000,
    programs: ["Engineering", "CS", "Architecture"],
    rating: 4.0,
    reviews_count: 112,
    description: "MUET is the premier engineering university of Sindh province.",
    facilities: { hostel: true, transport: true, labs: true, library: true, sports: false },
    website: "https://muet.edu.pk",
    color: "#1b4f72"
  },
  {
    id: 15,
    name: "University of Sargodha",
    abbreviation: "UOS",
    city: "Sargodha",
    sector: "Public",
    hec_ranking: 20,
    fee_per_semester: 12000,
    programs: ["Arts", "Sciences", "Business", "CS"],
    rating: 3.8,
    reviews_count: 65,
    description: "University of Sargodha is a public university serving Central Punjab region.",
    facilities: { hostel: true, transport: false, labs: true, library: true, sports: true },
    website: "https://uos.edu.pk",
    color: "#0e6655"
  }
];
```

---

## PHASE 1 TASK — START HERE

Build the complete React.js frontend:

### Step 1: Project Setup
```bash
npm create vite@latest unifind-pakistan -- --template react
cd unifind-pakistan
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom
npm install @heroicons/react
```

### Step 2: Build in this order:
1. `tailwind.config.js` — add custom colors
2. `src/data/universities.js` — paste universities data above
3. `src/App.jsx` — setup React Router with all routes
4. `src/components/Navbar.jsx` — sticky navbar with hamburger
5. `src/components/Footer.jsx`
6. `src/pages/Home.jsx` — full homepage
7. `src/components/UniversityCard.jsx` — reusable card
8. `src/pages/Universities.jsx` — listing with filters
9. `src/context/CompareContext.jsx` — compare state management
10. `src/components/CompareBar.jsx` — floating bottom bar
11. `src/pages/MeritCalculator.jsx`
12. `src/pages/Scholarships.jsx`
13. `src/pages/AdmissionTracker.jsx`
14. `src/pages/Login.jsx`

### Design Rules:
- Every page must have proper hero/header section
- All filters must work in real-time
- Compare feature must work across pages
- Must be fully mobile responsive
- Use Poppins font from Google Fonts
- Cards must have hover animations
- Loading states on all data fetches
- Empty states when no results

### Quality Standard:
Make it look like a **funded Pakistani startup product**.
Professional, clean, modern — not a student project.

---

## FUTURE PHASES

### Phase 2 — Backend
- Node.js + Express REST API
- Supabase database integration
- User authentication
- Reviews system with admin approval

### Phase 3 — Advanced Features  
- Merit calculator with real university merit data
- Email notifications for deadlines
- Admin dashboard
- PDF export for comparison

### Phase 4 — Launch
- Deploy on Netlify + Railway
- SEO optimization
- Beta testing
- Go live!

---

## DEVELOPER NOTE

> This platform is built free for all Pakistani students because when I was applying to university, my mother had to research everything alone. No student should face that problem again.
> — Gohar Zaib Gill

---
*UniFind Pakistan — Free for Everyone, Forever.*

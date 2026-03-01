# UniFind Pakistan - Complete Project Explanation

## What is this project?

UniFind Pakistan is a **multi-page university finder website** for Pakistani students. It helps students search, compare, and find the right university across Pakistan. Think of it as a one-stop platform for Pakistani university admissions.

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure and content |
| **CSS3** | Styling, animations, responsive design |
| **Vanilla JavaScript** | All functionality, no frameworks |
| **Google Fonts (Poppins)** | Clean, modern typography |
| **Unsplash** | Hero background image |
| **localStorage** | Save user preferences (theme, compare list) |

No React, no npm, no build tools. Pure HTML + CSS + JS.

---

## File Structure

```
pak u ni/
├── index.html          → Homepage (hero, top universities, how it works, CTA)
├── universities.html   → Full university listing with filters
├── detail.html         → Individual university detail page
├── compare.html        → Side-by-side university comparison
├── merit.html          → Merit calculator (matric/fsc/entry test)
├── scholarships.html   → Scholarship listings with filters
├── admissions.html     → Admission deadline tracker
├── login.html          → Login page (Google + email/password)
├── css/
│   └── style.css       → Complete styling (2600+ lines)
├── js/
│   ├── data.js         → 72 universities + 50 scholarships data
│   └── main.js         → All page functionality (900+ lines)
└── gohar.md            → This explanation file
```

---

## Color Theme System

The site supports **two themes** with a toggle button:

### Light Theme (Default)
| Element | Color |
|---------|-------|
| Page Background | `#faf8f5` (warm cream) |
| Card Background | `#ffffff` (pure white) |
| Headings | `#1f4d3f` (forest green) |
| Body Text | `#1a1a1a` (ink black) |
| Accent | `#c9a86a` (warm gold) |
| Borders | `#e8e4df` (warm gray) |
| Footer | `#1a3a2e` (dark forest green) |

### Dark Theme (noumanakram.com inspired)
| Element | Color |
|---------|-------|
| Page Background | `#0f2820` (forest-900) |
| Card Background | `rgba(255,255,255,0.04)` (subtle glass) |
| Headings/Accent | `#c9a86a` (warm gold) |
| Body Text | `rgba(245,240,232,0.9)` (cream) |
| Muted Text | `rgba(245,240,232,0.5)` |
| Borders | `rgba(255,255,255,0.08)` |
| Navbar | `rgba(15,40,32,0.85)` (forest glass) |

### Theme Toggle
- Uses `.dark` class on `<html>` element
- Persisted in `localStorage`
- Toggle button shows ☾ (moon) for light mode, ☀ (sun) for dark mode
- All components use CSS variables that auto-switch between themes

---

## Pages Explained

### 1. Homepage (`index.html`)

**Hero Section:**
- Professional university campus photo from Unsplash
- Semi-transparent cream overlay (dark mode: forest green overlay)
- Animated grid background pattern
- Floating green/gold orbs with blur effect
- Search bar that filters universities in real-time
- Stats: 72+ Universities, 200+ Programs, 26+ Cities, 100% Free

**Top Universities:**
- Shows top 6 universities by HEC ranking
- Cards with: abbreviation, name, city, sector, rating, programs, fee, compare/view buttons
- Hover effects with gold glow

**How It Works:**
- 3 steps: Search & Discover → Compare → Apply
- Step icons with gradient backgrounds

**CTA Banner:**
- Green gradient banner encouraging scholarship exploration

**Footer:**
- 4-column grid: Brand, Quick Links, Cities, Contact
- Social links, copyright

### 2. Universities Page (`universities.html`)

**Features:**
- Real-time search by name, city, or program
- Filters: City, Sector (Public/Private), Program, Fee Range, Sort
- Compare button on each card (max 4 universities)
- Compare bar appears at bottom when universities are selected
- Grid/List view of all 72 universities

**Filter System:**
- Filters work together (AND logic)
- Real-time filtering as you type or change filters
- Clear all filters button

### 3. University Detail Page (`detail.html`)

**Tabbed Interface:**
- **Overview Tab:** HEC ranking, fee, acceptance rate, students, description, facilities grid
- **Programs Tab:** List of all programs with degree types
- **Admission Tab:** Requirements, deadlines, contact info
- **Reviews Tab:** Student reviews with ratings

**Dynamic Content:**
- Loads university data from URL parameters
- Related universities suggestions
- Back to listings button

### 4. Compare Page (`compare.html`)

**Features:**
- Side-by-side comparison table
- Compare up to 4 universities
- Best value highlighting (lowest fee, highest ranking)
- Remove universities from comparison
- Responsive horizontal scroll on mobile

**Comparison Metrics:**
- Ranking, City, Sector, Fee, Rating, Programs, Facilities

### 5. Merit Calculator (`merit.html`)

**How it Works:**
- Input: Matric marks, FSc marks, Entry Test marks
- Calculates aggregate percentage
- Shows eligible universities (green = likely, yellow = possible, red = unlikely)
- Explains merit formula

**Merit Formula:**
```
Matric: 10%
FSc: 40%
Entry Test: 50%
```

### 6. Scholarships Page (`scholarships.html`)

**Features:**
- 50 real scholarships from Pakistani universities
- Search by name
- Filter by type: Need-Based, Merit, Government, International, Corporate, Special, Alumni
- Each card shows: university, type, amount, eligibility, required documents
- "Apply Now" button with live links to application portals

**Scholarship Types:**
- Need-Based: Financial assistance for needy students
- Merit-Based: Academic excellence awards
- Government: HEC, Ehsaas, etc.
- International: Fulbright, Erasmus, etc.
- Corporate: Company-sponsored scholarships
- Special: Sports, disability, minority quotas
- Alumni: University alumni scholarships

### 7. Admissions Tracker (`admissions.html`)

**Features:**
- 430+ deadline entries (6 per university)
- Month-by-month timeline view
- Stats dashboard: Closing This Week, This Month, Upcoming, Total
- Filters: Search, Month, Type, Sector, Sort
- Month navigation tabs
- "Apply" button with live links to university websites

**Deadline Types:**
- Early: Early admission deadlines
- Regular: Standard admission deadlines
- Late: Extended deadlines
- Rolling: Continuous admissions
- MS/MPhil: Graduate program deadlines
- PhD: Doctoral program deadlines

### 8. Login Page (`login.html`)

**Features:**
- Google Sign-In button (simulated)
- Email/Password form
- Remember me checkbox
- Forgot password link
- Create account link
- Centered card design on cream background
- Green gradient orb decorations

---

## Data Structure

### Universities (`data.js`)

Each university object contains:
```javascript
{
  id: 1,
  name: "National University of Sciences and Technology",
  abbreviation: "NUST",
  city: "Islamabad",
  sector: "Public",           // Public or Private
  hec_ranking: 1,
  programs: ["CS", "Engineering", ...],
  rating: 4.7,
  reviews_count: 1240,
  description: "...",
  facilities: {
    hostel: true,
    library: true,
    lab: true,
    sports: true,
    cafeteria: true,
    wifi: true,
    transport: true,
    medical: true
  },
  website: "https://nust.edu.pk",
  color: "#1f4d3f",           // Brand color for UI
  established: 1991,
  campus_area: "242 acres",
  students: 8500,
  faculty: 650,
  acceptance_rate: 8,
  location: "H-12, Islamabad",
  fee_per_semester: 150000
}
```

**Coverage:**
- 72 universities across Pakistan
- Punjab: 35 universities
- Sindh: 15 universities
- KPK: 12 universities
- Balochistan: 4 universities
- Federal: 5 universities
- AJK/GB: 3 universities

### Scholarships (`data.js`)

Each scholarship object contains:
```javascript
{
  id: 1,
  name: "HEC Need-Based Scholarship",
  university: "All Pakistan Universities",
  type: "Need-Based",
  amount: "Full Tuition + Stipend",
  eligibility: "Family income < 45,000/month",
  deadline: "2026-08-30",
  documents: ["CNIC", "Income Certificate", "Transcripts"],
  contact: "scholarships@hec.gov.pk",
  link: "https://hec.gov.pk/scholarships",
  description: "..."
}
```

**50 scholarships** from HEC, universities, international programs, and corporate sponsors.

---

## JavaScript Functionality (`main.js`)

### Core Functions

| Function | Purpose |
|----------|---------|
| `initLoadingScreen()` | Shows/hides loading spinner |
| `initNavbar()` | Handles scroll effects on navbar |
| `initHamburger()` | Mobile menu toggle |
| `initScrollAnimations()` | Fade-in animations on scroll |
| `toggleTheme()` | Dark/light mode toggle |
| `setActiveNavLink()` | Highlights current page in nav |
| `updateCompareBar()` | Shows/hides compare bar |

### Page-Specific Functions

| Function | Page | Purpose |
|----------|------|---------|
| `renderTopUniversities()` | index.html | Renders top 6 university cards |
| `initHeroSearch()` | index.html | Search from hero section |
| `renderUniversities()` | universities.html | Renders all university cards |
| `initFilters()` | universities.html | Handles filter changes |
| `renderDetailPage()` | detail.html | Renders university details |
| `initTabs()` | detail.html | Tab switching |
| `renderComparePage()` | compare.html | Renders comparison table |
| `initMeritCalculator()` | merit.html | Merit calculation logic |
| `renderScholarships()` | scholarships.html | Renders scholarship cards |
| `initScholarshipFilters()` | scholarships.html | Handles scholarship filters |
| `initAdmissionsPage()` | admissions.html | Renders admission timeline |

### Compare System

```javascript
// Add/remove universities from compare
function toggleCompare(id) {
  let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
  if (compareList.includes(id)) {
    compareList = compareList.filter(x => x !== id);
  } else if (compareList.length < 4) {
    compareList.push(id);
  }
  localStorage.setItem('compareList', JSON.stringify(compareList));
  updateCompareBar();
}
```

- Max 4 universities can be compared
- Stored in `localStorage`
- Compare bar appears at bottom of screen
- Shows selected university count

---

## CSS Architecture

### CSS Variables

All colors, shadows, and transitions use CSS variables for easy theming:

```css
:root {
  --primary: #1f4d3f;
  --accent: #c9a86a;
  --white: #ffffff;
  --cream-50: #faf8f5;
  --ink: #1a1a1a;
  --border-subtle: #e8e4df;
  --shadow-md: 0 4px 12px rgba(26, 58, 46, 0.08);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  --primary: #c9a86a;
  --cream-50: #0f2820;
  --ink: rgba(245, 240, 232, 0.9);
  /* ... */
}
```

### Component Styling

Each component follows this pattern:
1. Base styles with CSS variables
2. Hover/active states
3. Dark mode overrides using `.dark` selector
4. Responsive breakpoints

### Animations

| Animation | Used On |
|-----------|---------|
| `fadeInUp` | Cards, sections on scroll |
| `float` | Hero orbs |
| `spin` | Loading spinner |
| `slideIn` | Compare bar |

### Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| `> 1200px` | Full desktop layout |
| `768px - 1200px` | Tablet layout, 2-column grids |
| `< 768px` | Mobile layout, single column, hamburger menu |

---

## Key Features Summary

1. **72 Real Universities** with actual data, websites, and locations
2. **50 Real Scholarships** with live application links
3. **430+ Admission Deadlines** tracked monthly
4. **Dark/Light Theme** toggle with persistence
5. **Merit Calculator** with eligibility matching
6. **Side-by-Side Comparison** of up to 4 universities
7. **Real-Time Search & Filters** across all pages
8. **Mobile Responsive** design
9. **Smooth Animations** and transitions
10. **Professional Design** inspired by noumanakram.com

---

## How to Run

1. Open `index.html` in any web browser
2. No server required - works with `file://` protocol
3. For best experience, use a local server:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .

   # VS Code
   Live Server extension
   ```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Credits

- **Design Inspiration:** [noumanakram.com](https://noumanakram.com/)
- **Images:** Unsplash
- **Fonts:** Google Fonts (Poppins)
- **University Data:** HEC Pakistan rankings
- **Scholarship Data:** HEC, university websites, international programs

---

## Author

Made with love for Pakistani students. Helping students find their perfect university since 2026.

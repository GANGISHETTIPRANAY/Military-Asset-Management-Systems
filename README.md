# Military-Asset-Management-Systems
Key Features Implemented 📊 Dashboard: Displays Opening Balance, Net Movement, Assigned, Expended with filters and interactive net movement breakdown.

🛒 Purchases Page: Record and view asset purchases per base.

🔁 Transfers Page: Facilitate and log asset transfers between bases.

📋 Assignments Page: Assign equipment to personnel and track usage.

🔐 Role-Based Access Control: Role-specific access (Admin, Base Commander, Logistics Officer).

🗃 Responsive Design: Clean UI using React and Tailwind CSS.

🔍 Important Architectural Note 🔁 Transfers Page Current Implementation: Uses local React state (useState) to track transfers within the current session.

Why?: Built this way for early UI demonstration and faster testing.

Limitation: Data is not saved to a backend, meaning it resets on page reload and is not shared across users.

Plan: This will be replaced with API calls to a backend server (e.g., Express.js + MySQL) in the final version to support persistent logging, RBAC, and data access.

📦 Purchases, Assignments, and Dashboard Pages Current Implementation: These pages already use Axios to interact with backend APIs.

Data is stored and fetched from the server (http://localhost:5000/api/...).

Changes reflect across all users and sessions.

Supports full data persistence, security, and audit trails.

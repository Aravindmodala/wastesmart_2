WasteSmart - Reduce Waste, Save Money
Connecting vendors and customers to minimize waste & maximize savings!

🌟 Overview
WasteSmart is a web application designed to reduce grocery and medical waste by allowing vendors to sell near-expiry products at discounted prices. This helps customers save money while promoting sustainability. ♻️

🚀 Features
Vendor Dashboard – Manage products (add, update, delete).
Smart Discounts – Automatic price reductions for near-expiry products.
Sales Analytics – Track revenue and sales trends.
Customer Shopping – Browse and add products to cart.
Cart & Checkout – Secure payment and order processing.
Order Tracking – View order history and delivery status.
Donations – Customers & vendors can donate items to charities.
🛠 Tech Stack
Frontend: React (Vite), TailwindCSS, React Router
Backend: FastAPI (Python), SQLAlchemy ORM
Database: PostgreSQL
Other Services: Redis (Caching), AWS S3 (Storage), Stripe (Payments), JWT Authentication
Deployment & CI/CD: GitHub Actions
📥 Installation Guide
1. Clone the Repository
sh
Copy
Edit
git clone https://github.com/Aravindmodala/wastesmart_2.git
cd wastesmart_2
2. Set Up the Backend (FastAPI)
sh
Copy
Edit
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Backend should now be running at: http://127.0.0.1:8000 🚀

3. Start the Frontend (React)
sh
Copy
Edit
cd frontend
npm install
npm run dev
Frontend should now be running at: http://localhost:3000 🎉

📄 API Documentation
Swagger API Docs: http://127.0.0.1:8000/docs
Redoc API Docs: http://127.0.0.1:8000/redoc
🤝 Contributing
We welcome contributions! Feel free to submit a pull request or open an issue.

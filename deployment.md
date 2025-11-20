
## 🚀 **deployment.md**

```markdown
# Deployment Process Documentation

## Deployment Architecture Overview

### System Components
- **Backend API**: FastAPI application deployed on Render
- **Frontend Application**: Next.js application deployed on Vercel
- **Machine Learning Model**: Integrated within backend
- **Database**: (Optional) For future satellite data storage

### Infrastructure Diagram

User Request → Vercel CDN → Next.js Frontend → Render Backend → ML Model → Response

### Platform Configuration

#### Render Service Settings
```yaml
Service Name: backend-rwanda-orbit-guard
Platform: Web Service
Region: Ohio (US)
Instance: Free Tier
Branch: main
Auto-Deploy: Enabled

### Build Specifications
```yaml
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
Python Version: 3.9.16
Build Directory: /backend

### Deployment Steps

Step 1: Repository Connection
Navigate to Render Dashboard

Click "New +" → "Web Service"

Connect GitHub repository

Select repository: https://github.com/IkireziI/backend_rwanda_orbit_guard.git

Configure build settings


Step 2: Environment Configuration

# Environment Variables
PYTHON_VERSION=3.9.16
ENVIRONMENT=production
CORS_ORIGINS=https://rwanda-orbit-guard-ktrk.vercel.app

Step 3: Build Process

# Automated Build Pipeline
1. Clone repository
2. Install dependencies from requirements.txt
3. Run pre-deployment checks
4. Start FastAPI server on port $PORT

Backend Deployment Logs Example

     ==> Deploying...
==> Running 'uvicorn main:app --host 0.0.0.0 --port $PORT'
     ==> No open ports detected, continuing to scan...
     ==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
INFO:     Started server process [57]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:10000 (Press CTRL+C to quit)
INFO: Successfully loaded ML Model: ./rwanda_orbit_guard_model.pkl
INFO:     127.0.0.1:50218 - "HEAD / HTTP/1.1" 405 Method Not Allowed
     ==> Your service is live 🎉
     ==> 
     ==> ///////////////////////////////////////////////////////////
     ==> 
     ==> Available at your primary URL https://backend-rwanda-orbit-guard.onrender.com
     ==> 
     ==> ///////////////////////////////////////////////////////////
INFO:     35.197.97.226:0 - "GET / HTTP/1.1" 200 OK
     ==> Detected service running on port 10000
     ==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
INFO:     Shutting down
INFO:     Waiting for application shutdown.
INFO:     Application shutdown complete.
INFO:     Finished server process [57]

Frontend Deployment (Vercel)

Project Name: rwanda-orbit-guard-ktrk
Framework: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Node Version: 18.x

Deployment Steps
Step 1: Project Setup
Navigate to Vercel Dashboard

Click "Add New..." → "Project"

Import Git repository

Configure project settings

Step 2: Build Configuration

{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}

Frontend Deployment Logs Example


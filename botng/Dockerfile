FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Run application - Railway will set PORT, we use Python to read it
CMD python -c "import os; port = os.environ.get('PORT', '8000'); import subprocess; subprocess.run(['uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', port])"

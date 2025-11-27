FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Railway uses PORT env variable
ENV PORT=8000

# Run application
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT

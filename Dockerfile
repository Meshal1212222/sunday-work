FROM python:3.11-slim

# Build version: 2.0 - Sunday Board Pro (2026-01-19)
WORKDIR /app

# Copy requirements and install dependencies
COPY botng/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY botng/ .

# Copy src folder (Golden Host, Sunday Board dashboards)
COPY src/ ./src/

# Expose port
EXPOSE 8000

# Run application
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY botng/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY botng/ .

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

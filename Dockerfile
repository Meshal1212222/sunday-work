FROM python:3.11-slim

# ========================================
# Build version: 3.0 - FRESH BUILD
# Date: 2026-01-19 - Fixed duplicate Dockerfile
# ========================================
WORKDIR /app

# Copy requirements and install dependencies
COPY botng/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY botng/ .

# Copy src folder (Golden Host, Sunday Board dashboards)
COPY src/ ./src/

# Verify src folder was copied
RUN echo "=== Verifying src folder ===" && \
    ls -la /app/src/ && \
    ls -la /app/src/sunday-board/ && \
    echo "=== src folder OK ==="

# Expose port
EXPOSE 8000

# Run application
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

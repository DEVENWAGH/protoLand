FROM python:3.11-slim

WORKDIR /app

# Create non-root user with UID 1000 (Required by Hugging Face Spaces)
RUN useradd -m -u 1000 user

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=user:user . .

USER user

# Hugging Face Spaces default port is 7860; Docker Compose can override via PORT env var
ENV PORT=7860
EXPOSE 7860

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860}"]

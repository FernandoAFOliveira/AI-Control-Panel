# Use a slim Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt /app/requirements.txt
RUN apt-get update && \
    apt-get install -y portaudio19-dev espeak-ng libespeak-dev && \
    rm -rf /var/lib/apt/lists/*
    pip install --no-cache-dir -r requirements.txt

# Copy your backend code
COPY . /app

# Expose the port FastAPI will run on
EXPOSE 5000

# Run Uvicorn when container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]

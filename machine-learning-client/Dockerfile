FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY Pipfile Pipfile.lock ./
RUN pip install --no-cache-dir pipenv && \
    pipenv install --deploy --ignore-pipfile

COPY . .

RUN pipenv install gunicorn

ENV PYTHONUNBUFFERED=1

EXPOSE 5001

CMD ["pipenv", "run", "gunicorn", "app:app", "-b", "0.0.0.0:5001"]

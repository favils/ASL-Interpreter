FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY Pipfile Pipfile.lock /app/

RUN pip install --no-cache-dir pipenv && pipenv install --deploy --ignore-pipfile

COPY . /app/

ENV FLASK_APP=app:create_app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5002

RUN pipenv install gunicorn

EXPOSE 5002

CMD ["pipenv", "run", "gunicorn", "app:create_app()", "-b", "0.0.0.0:5002"]

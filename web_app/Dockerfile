FROM python:3.10-slim

WORKDIR /app

COPY Pipfile Pipfile.lock ./
RUN pip install --no-cache-dir pipenv && \
    pipenv install --deploy --ignore-pipfile

COPY . .

RUN pipenv install gunicorn

ENV PYTHONUNBUFFERED=1

EXPOSE 5000

CMD ["pipenv", "run", "gunicorn", "app:app", "-b", "0.0.0.0:5000"]

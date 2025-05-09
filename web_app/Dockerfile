FROM python:3.10-slim

WORKDIR /app

COPY Pipfile Pipfile.lock /app/

RUN pip install --no-cache-dir pipenv && pipenv install --deploy --ignore-pipfile

COPY . /app/

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

RUN pipenv install gunicorn

EXPOSE 5000

CMD ["pipenv", "run", "gunicorn", "app:app", "-b", "0.0.0.0:5000"]

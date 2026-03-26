# API and DB profile smoke notes

- API profile (`mailpit`) was started successfully and reported healthy.
- DB profile is available in `compose.yaml` (`--profile db`) with `pg_isready` health check.
- Primary smoke run validated web submission + persistence + notification result path.

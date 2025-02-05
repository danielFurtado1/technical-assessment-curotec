# technical-assessment-curotec

The application is fully containerized using Docker and can be run locally with a single command

To run the project with docker:

1 - Create the .env file with the database connection string;
2 - run the command in your terminal: docker-compose up --build


To run the project without docker:
Backend:
1 - run the command npm install;
2 - Create an .env file with the database connection string;
3 - run the command npx prisma generate;
4 - run the command npx prisma migrate dev --name init;
5 - run the command npm run dev;

Frontend:
1 - run the command npm install;
2 - run the command npm start;


Observations:
- The frontend is running on port 3000;
- The backend is running on port 5000;

- I implemented the Unit Tests configurations, however due to the lack of time I was not able to create the tests
- I would not implement the integration tests because I never worked with it, but I am willing to learn and implement it in the future
# Carteira
Carteira translates to Wallet from Portuguese. Carteira was built to be a self-hosted personal finance application. 
It is still early in development so features are limited to viewing, editing, and organizing transactions, and viewing account information and balances.

## The Stack
Carteira is a Spring Boot application with a ReactJS frontend. The frontend and backend are completely seperated into two different applications.
The backend uses the Plaid API to fetch transaction and account data. The data is stored in a PostgreSQL database for use.
A GraphQL endpoint bridges the front and back ends. The React application uses Apollo GraphQL to fetch and cache the data.
The entire frontend is written in TypeScript for type safety and scalability. TailwindCSS is used for all styling.

## Deployment
Carteira is containarized using Docker. The docker-compose and .env file are used to specify the deployment parameters specific to your setup.

## Next Steps
The current development priorities for Carteira involve adding charts to display historical balance data and creating budgets to manage spending.

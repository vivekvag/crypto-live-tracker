# Crypto Live Tracker

## Screenshot:

![Alt text](https://github.com/vivekvag/crypto-live-tracker/blob/main/screenshot/landing_page.png)
![Alt text](https://github.com/vivekvag/crypto-live-tracker/blob/main/screenshot/modal.png)
![Alt text](https://github.com/vivekvag/crypto-live-tracker/blob/main/screenshot/modal_v2.png)

### Backend

- **Real-time Data Polling:** Implemented using WebSocket for efficient real-time data updates.
- **Data Fetching:** Utilized Node-cron for scheduled fetching of data from chosen APIs (e.g., LiveCoinWatch, CoinGecko).
- **Database Management:** Integrated MongoDB for storing real-time data entries.
- **Data Handling:** Implemented a function to manage database entries, ensuring data older than five minutes is automatically purged.

### Frontend

- **Dynamic Table Display:** Displayed the most recent 20 real-time data entries from MongoDB.
- **Real-time Updates:** Achieved using WebSocket to dynamically update table values based on new data.
- **User Interaction:** Included a modal/popup with a button to enable users to switch between stocks or cryptocurrencies.

### Additional Details

- **Technology Stack:** Express, TypeScript, Redux.
- **Persistence:** Managed state using Redux, storing all state in localStorage to maintain consistency and avoid reliance on useState().
- **Documentation:** Included a comprehensive README detailing installation and execution steps for local testing.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 12.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:

   ```sh
   git git@github.com:vivekvag/crypto-live-tracker.git
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Project

1. Build the project:

   ```sh
   npm run build
   ```

2. Start the project:
   ```sh
   npm run start
   ```

The project should now be running at `http://localhost:10000`.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Credits

- **LiveCoinWatch**: For providing the API used for fetching real-time price data.
- **Render**: For hosting the live demo of the project.

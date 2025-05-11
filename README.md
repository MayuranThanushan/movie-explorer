# Movie Explorer App

## Project Overview

Movie Explorer is a web application that allows users to search for movies, view detailed information, and discover trending films. The app fetches real-time data from The Movie Database (TMDb) API and provides an intuitive user experience with a search bar, movie details, and theme toggling functionality.

The app also supports the ability to save favorite movies, search history, and local persistence of user preferences like theme and favorite movies.

## Features

- **Search Functionality**: Users can type movie names to find matching results.
- **Trending Movies**: A section that displays trending movies from the API.
- **Movie Details**: Clicking on any movie poster shows detailed information, including:
  - Overview
  - Genre
  - Cast
  - Rating
  - Trailer Link
- **Light/Dark Mode**: Toggle between light and dark themes for a better user experience.
- **Favorites**: Users can save their favorite movies, which are stored in `localStorage` for persistence.
- **Search History**: The last searched movie is stored in `localStorage`.

## API Usage

The app fetches movie data from The Movie Database (TMDb) API. You can sign up for a free API key at [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction).

### How to Get an API Key:

1. Go to [TMDb API](https://www.themoviedb.org/documentation/api).
2. Sign up or log in to your TMDb account.
3. Navigate to your account settings and find the **API** section.
4. Generate an API key and copy it.

### API Configuration:

To use the app, you'll need an API key. Add the API key to your `.env` file in the following format:

```bash
REACT_APP_TMDB_API_KEY=your_api_key_here
````

## Technologies Used

* **React**: JavaScript library for building user interfaces.
* **Material UI (MUI)**: UI component library for styling.
* **TMDb API**: Movie data provider.
* **Vercel**: For app deployment.

## How to Run Locally

Follow these steps to run the project locally on your machine:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/movie-explorer-app.git
   cd movie-explorer-app
   ```

2. **Install Dependencies**:
   Install all required dependencies using npm:

   ```bash
   npm install
   ```

3. **Set Up the API Key**:

   * Add your API key to the `.env` file at the root of the project:

     ```bash
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```

4. **Start the Development Server**:
   To start the app locally, run:

   ```bash
   npm start
   ```

5. **Visit the App**:
   Open your browser and visit `http://localhost:3000` to see the app in action.

## Contributing

Feel free to fork the repository and submit pull requests. To contribute:

1. **Fork the Repo**:

   * Go to the repository page and click **Fork** at the top-right corner.

2. **Create a New Branch**:

   ```bash
   git checkout -b feature-name
   ```

3. **Make Your Changes**:

   * Add your changes or features.

4. **Commit Your Changes**:

   ```bash
   git commit -am 'Add feature-name'
   ```

5. **Push to the Branch**:

   ```bash
   git push origin feature-name
   ```

6. **Submit a Pull Request**:

   * Open a pull request and explain your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Structure

Here’s a breakdown of the key files and directories in the project:

* **src/**

  * **components/**: Contains all the React components (e.g., MovieCard, SearchBar, MovieDetails, etc.).
  * **context/**: Contains files for managing global state (if using React Context API).
  * **hooks/**: Custom React hooks for reusable logic.
  * **App.js**: Main app component where routing and state management are handled.
  * **index.js**: Entry point of the application.
* **.env**: Stores the TMDb API key and other environment variables.
* **public/**: Contains static files like the `index.html`, app icons, and images.

## Acknowledgements

* [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data API.
* [Material UI](https://mui.com/) for the beautiful and responsive UI components.
* [Vercel](https://vercel.com) for easy deployment.


import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Box from './components/Box'
import Main from './components/Main'
import Loader from './components/Loader'
import NumResults from './components/NumResults'
import ErrorMessage from './components/ErrorMessage'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'
import WatchedMoviesList from './components/WatchedMovieList'
import WatchedSummary from './components/WatchedSummary'

const API_KEY = process.env.REACT_APP_API_KEY

export default function App() {
  const [movies, setMovies] = useState([])
  const [watched, setWatched] = useState([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        if (!res.ok) throw new Error('Something went wrong')
        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found')
        setMovies(data.Search)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }
    getData()
  }, [query])

  function handleSelectMovie(id) {
    setSelectedId(selectedId => (id === selectedId ? null : id))
  }

  function handleCloseMovie(id) {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }

  return (
    <>
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              onSelectMovie={handleSelectMovie}
              movies={movies}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

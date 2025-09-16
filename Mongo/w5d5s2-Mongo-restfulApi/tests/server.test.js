const movieController = require('../controllers/movieController');
const Movie = require('../models/movieModel');

// Mock the Movie model
jest.mock('../models/movieModel');

describe('Movie_Model_Validation', () => {
  test('movie_model_should_have_required_fields', () => {
    const schema = Movie.schema.paths;

    expect(schema).toHaveProperty('title');
    expect(schema.title.isRequired).toBeTruthy();

    expect(schema).toHaveProperty('director');
    expect(schema.director.isRequired).toBeTruthy();

    expect(schema).toHaveProperty('releaseYear');
    expect(schema.releaseYear.isRequired).toBeTruthy();

    expect(schema).toHaveProperty('genre');
    expect(schema.genre.isRequired).toBeTruthy();
  });
});


describe('movieController_CreateMovie_Test', () => {
  test('createMovie_should_return_201_and_saved_movie', async () => {
    const req = {
      body: {
        title: 'Inception',
        director: 'Christopher Nolan',
        releaseYear: 2010,
        genre: 'Sci-Fi'
      }
    };
    const savedMovie = { ...req.body, _id: 'mockid123' };

    Movie.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(savedMovie)
    }));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.createMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedMovie);
  });

  test('createMovie_should_return_500_on_error', async () => {
    const req = { body: {} };
    const mockError = new Error('Save failed');

    Movie.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(mockError)
    }));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.createMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

describe('movieController_GetAllMovies_Test', () => {
  test('getAllMovies_should_return_all_movies', async () => {
    const mockMovies = [
      { title: 'Movie 1' },
      { title: 'Movie 2' }
    ];

    Movie.find.mockResolvedValue(mockMovies);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.getAllMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMovies);
  });

  test('getAllMovies_should_return_500_on_error', async () => {
    const err = new Error('DB error');
    Movie.find.mockRejectedValue(err);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.getAllMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });
});

describe('movieController_GetMovieById_Test', () => {
  test('getMovieById_should_return_movie_if_found', async () => {
    const mockMovie = { title: 'Avatar' };
    Movie.findById.mockResolvedValue(mockMovie);

    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.getMovieById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMovie);
  });

  test('getMovieById_should_return_404_if_not_found', async () => {
    Movie.findById.mockResolvedValue(null);

    const req = { params: { id: 'unknown' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.getMovieById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
  });

  test('getMovieById_should_return_500_on_error', async () => {
    const err = new Error('FindById error');
    Movie.findById.mockRejectedValue(err);

    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.getMovieById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });
});

describe('movieController_UpdateMovie_Test', () => {
  test('updateMovie_should_return_updated_movie', async () => {
    const updated = { title: 'Updated Movie' };
    Movie.findByIdAndUpdate.mockResolvedValue(updated);

    const req = {
      params: { id: '123' },
      body: { title: 'Updated Movie' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.updateMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test('updateMovie_should_return_404_if_not_found', async () => {
    Movie.findByIdAndUpdate.mockResolvedValue(null);

    const req = { params: { id: 'unknown' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.updateMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
  });

  test('updateMovie_should_return_500_on_error', async () => {
    const err = new Error('Update error');
    Movie.findByIdAndUpdate.mockRejectedValue(err);

    const req = { params: { id: '123' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.updateMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });
});

describe('movieController_DeleteMovie_Test', () => {
  test('deleteMovie_should_return_success_if_deleted', async () => {
    const deleted = { title: 'To be deleted' };
    Movie.findByIdAndDelete.mockResolvedValue(deleted);

    const req = { params: { id: '456' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.deleteMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Movie deleted successfully' });
  });

  test('deleteMovie_should_return_404_if_not_found', async () => {
    Movie.findByIdAndDelete.mockResolvedValue(null);

    const req = { params: { id: 'unknown' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.deleteMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
  });

  test('deleteMovie_should_return_500_on_error', async () => {
    const err = new Error('Delete error');
    Movie.findByIdAndDelete.mockRejectedValue(err);

    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await movieController.deleteMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });
});

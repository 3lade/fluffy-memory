const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

describe('authController_Login_Test', () => {
  test('login_should_return_200_on_successful_credentials', () => {
    const req = {
      body: { username: 'john', password: '1234' },
      session: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    authController.login(req, res);

    expect(req.session.user).toBe('john');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful' });
  });

  test('login_should_return_401_on_invalid_credentials', () => {
    const req = {
      body: { username: 'wrong', password: 'wrong' },
      session: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });
});

describe('authController_Profile_Test', () => {
  test('profile_should_return_200_with_welcome_message', () => {
    const req = {
      session: { user: 'john' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    authController.profile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Welcome to your profile, john!'
    });
  });
});

describe('authMiddleware_Test', () => {
  test('authmiddleware_should_call_next_if_user_authenticated', () => {
    const req = { session: { user: 'john' } };
    const res = {};
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('authmiddleware_should_return_401_if_user_not_authenticated', () => {
    const req = { session: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized. Please log in.' });
    expect(next).not.toHaveBeenCalled();
  });
});

const shopController = require('../controllers/shopController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

describe('shopController_Login_Test', () => {
  test('login_should_return_400_if_username_or_role_missing', () => {
    const req = { body: { username: 'alice' }, session: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    shopController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username and role are required' });
  });

  test('login_should_return_400_if_invalid_role', () => {
    const req = { body: { username: 'alice', role: 'guest' }, session: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    shopController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid role. Must be admin or staff' });
  });

  test('login_should_return_200_when_valid_credentials', () => {
    const req = { body: { username: 'alice', role: 'admin' }, session: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    shopController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Welcome alice (admin)' });
  });
});

describe('shopController_Dashboard_Test', () => {
  test('dashboard_should_return_admin_data_if_admin_logged_in', () => {
    const req = { session: { user: { username: 'adminUser', role: 'admin' } } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    shopController.dashboard(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const jsonResponse = res.json.mock.calls[0][0];
    expect(jsonResponse.message).toContain('Admin Dashboard');
  });

  test('dashboard_should_return_staff_data_if_staff_logged_in', () => {
    const req = { session: { user: { username: 'staffUser', role: 'staff' } } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    shopController.dashboard(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const jsonResponse = res.json.mock.calls[0][0]; 
  expect(jsonResponse.message).toContain('Staff Dashboard');
  });

  test('dashboard_should_return_403_for_unknown_role', () => {
    const req = { session: { user: { username: 'weirdUser', role: 'manager' } } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    shopController.dashboard(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Role not authorized' });
  });
});

describe('authMiddleware_Test', () => {
  test('authmiddleware_should_call_next_if_session_user_exists', () => {
    const req = { session: { user: { username: 'admin' } } };
    const res = {};
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

});

describe('roleMiddleware_Test', () => {
  test('rolemiddleware_should_call_next_if_role_matches', () => {
    const req = { session: { user: { role: 'admin' } } };
    const res = {};
    const next = jest.fn();

    const middleware = roleMiddleware('admin');
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('rolemiddleware_should_return_403_if_role_mismatch', () => {
    const req = { session: { user: { role: 'staff' } } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    const middleware = roleMiddleware('admin');
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: insufficient role.' });
    expect(next).not.toHaveBeenCalled();
  });
});

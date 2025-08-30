const fs = require('fs');
const path = require('path');
const {
  createUserFile,
  readUsers,
  addUser,
  deleteUserFile
} = require('../index'); // adjust path as needed

jest.mock('fs');

describe('UserFile_Functions', () => {
  const filePath = path.resolve('users.json');

  const sampleUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  beforeEach(() => {
    fs.existsSync.mockReset();
    fs.readFileSync.mockReset();
    fs.writeFileSync.mockReset();
    fs.unlinkSync.mockReset();
  });

  // ✅ Check functions are defined
  test('UserFile_Should_Define_createUserFile_Function', () => {
    expect(createUserFile).toBeDefined();
  });

  test('UserFile_Should_Define_readUsers_Function', () => {
    expect(readUsers).toBeDefined();
  });

  test('UserFile_Should_Define_addUser_Function', () => {
    expect(addUser).toBeDefined();
  });

  test('UserFile_Should_Define_deleteUserFile_Function', () => {
    expect(deleteUserFile).toBeDefined();
  });

  // ✅ createUserFile
  test('UserFile_Should_Create_User_File_With_Initial_Data', () => {
    const result = createUserFile();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(sampleUsers, null, 2)
    );
    expect(result).toBe('User file created.');
  });

  // ✅ readUsers
  test('UserFile_Should_Read_Users_From_File_When_Exists', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleUsers));

    const result = readUsers();
    expect(result).toEqual(sampleUsers);
  });

  test('UserFile_Should_Handle_File_Not_Found_In_ReadUsers', () => {
    fs.existsSync.mockReturnValue(false);
    const result = readUsers();
    expect(result).toBe('User file not found.');
  });

  // ✅ addUser
  test('UserFile_Should_Add_New_User_To_File', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleUsers));
    const newUser = { id: 3, name: 'Charlie', email: 'charlie@example.com' };

    const result = addUser(newUser);

    const expectedData = [...sampleUsers, newUser];
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(expectedData, null, 2)
    );
    expect(result).toBe('User Charlie added.');
  });

  // ✅ deleteUserFile
  test('UserFile_Should_Delete_File_When_Exists', () => {
    fs.existsSync.mockReturnValue(true);
    const result = deleteUserFile();
    expect(fs.unlinkSync).toHaveBeenCalledWith(filePath);
    expect(result).toBe('User file deleted.');
  });

  test('UserFile_Should_Handle_Delete_When_File_Does_Not_Exist', () => {
    fs.existsSync.mockReturnValue(false);
    const result = deleteUserFile();
    expect(result).toBe('No user file to delete.');
  });
});

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('users', [
      {
        name: 'administrador',
        email: 'adm@adm.com',
        password_hash: '1233456',
        student: false,
        confirmed: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

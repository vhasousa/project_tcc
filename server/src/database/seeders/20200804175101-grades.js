module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('grades', [
      {
        number: 6,
        level: 'Fundamental',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 7,
        level: 'Fundamental',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 8,
        level: 'Fundamental',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 9,
        level: 'Fundamental',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 1,
        level: 'Médio',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 2,
        level: 'Médio',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 3,
        level: 'Médio',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),

  down: (queryInterface) => {
    return queryInterface.bulkDelete('grades', null, {});
  },
};

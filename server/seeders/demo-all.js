'use strict';

// npx sequelize-cli db:seed:all
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'kim@hello.com',
        password: '1111',
        nickname: 'rollKim',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'lee@hello.com',
        password: '1111',
        nickname: 'rollLee',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'park@hello.com',
        password: '1111',
        nickname: 'rollPark',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]); // end of bulkInsert to users

    const users = await queryInterface.sequelize.query(
      `SELECT id, nickname FROM users`
    );
    return await users.map(user => {
      queryInterface.bulkInsert('posts', [
        {
          title: `${user.nickname}의 롤링페이퍼`,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: `${user.nickname}의 롤링페이퍼`,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: `${user.nickname}의 롤링페이퍼`,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]); // end of bulkInsert to posts
    });

    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);
    return await posts.map(post => {
      queryInterface.bulkInsert('messages', [
        {
          postId: postRows[0].id,
          content: 'Life is what happens when you are busy making other plans.',
          writer: 'John Lennon',
          createdAt: new Date(),
        },
        {
          postId: postRows[0].id,
          content:
            'Always remember that you are absolutely unique. Just like everyone else',
          writer: 'Margaret Mead',
          createdAt: new Date(),
        },
        {
          postId: postRows[0].id,
          content:
            '아침에는 모든 게 가능해 보인다. 아이디어로 넘쳐흐른다! 가능성! 타인을 향한 사랑! 아무도 나를 멈출 수 없다. 하지만 오후 4시쯤 되면 나 자신과 인류에 대한 기대를 깨끗이 단념한다. 그렇게 미루기는 늦은 오후에 정점을 찍는다. ',
          writer: '미루기의 천재들',
          createdAt: new Date(),
        },
        {
          postId: postRows[0].id,
          content: '식물에서 푸른 빛이 나는 게 분명 흔한 일은 아니죠?',
          writer: '지구 끝의 온실',
          createdAt: new Date(),
        },
        {
          postId: postRows[0].id,
          content:
            'You will face many defeats in life, but never let yourself be defeated.',
          writer: 'Maya Angelou',
          createdAt: new Date(),
        },
      ]); // end of bulkInsert to messages
    });
  },
  // end of up();

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('posts', null, {});
    // await queryInterface.bulkDelete('messages', null, {});
  },
};

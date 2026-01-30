import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { PrismaClient, Prisma, User } from '../generated/prisma/client';
import { PasswordService } from 'src/auth/password.service';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const passwordService = new PasswordService();

async function clearDatabase() {
  console.log('Очистка базы данных...');
  await prisma.photo.deleteMany();
  await prisma.content.deleteMany();
  await prisma.item.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
}

async function createUser(password: string) {
  const salt = passwordService.getSalt();
  const hash = passwordService.getHash(password, salt);

  return await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      salt,
      hash,
      account: {
        create: { isBlockingEnabled: false },
      },
      photo: {
        create: {
          url: faker.image.avatar(),
          filename: `avatar-${faker.string.uuid()}.jpg`,
          originalName: 'avatar.jpg',
        },
      },
    },
  });
}

function generatePhotosForItem() {
  const count = faker.number.int({ min: 1, max: 3 });
  return Array.from({ length: count }).map(() => {
    const randomUrl = faker.image.urlLoremFlickr({
      category: 'abstract',
      width: 800,
      height: 600,
    });
    return {
      url: randomUrl,
      filename: `seed-${faker.string.uuid()}.jpg`,
      originalName: 'generated-image.jpg',
    };
  });
}

async function main() {
  console.log('🌱 Начинаем сидинг (Prisma v7 style)...');

  await clearDatabase();

  console.log('👤 Создание пользователей...');
  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const user = await createUser('password123');
    users.push(user);
  }

  console.log(
    `🚀 Создание айтемов с контентом и фото для ${users.length} пользователей...`,
  );
  const itemsPromises: Prisma.Prisma__ItemClient<any>[] = [];

  for (let i = 0; i < 100; i++) {
    const author = faker.helpers.arrayElement(users);

    itemsPromises.push(
      prisma.item.create({
        data: {
          title: faker.word.adjective() + ' ' + faker.word.noun(),
          published: true,
          authorId: author.id,
          content: {
            create: {
              type: 'черная дыра',
              subtype: faker.helpers.arrayElement([
                'сверхмассивная',
                'средняя',
              ]),
              size: `${faker.number.int({ min: 5000, max: 500000 })} км`,
            },
          },
          photos: {
            create: generatePhotosForItem(),
          },
          createdAt: faker.date.recent({ days: 30 }),
        },
      }),
    );
  }

  await prisma.$transaction(itemsPromises);

  console.log('✨ Сид успешно завершен! Создано 100 объектов.');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Ошибка сида:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

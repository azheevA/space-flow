import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { PrismaClient, Prisma, User } from '../generated/prisma/client';
import { PasswordService } from '../src/auth/password.service';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const SEED_ASSETS_DIR = path.join(process.cwd(), 'prisma', 'seed-assets');
if (!fs.existsSync(SEED_ASSETS_DIR)) {
  console.error(
    `❌ ОШИБКА: Папка ${SEED_ASSETS_DIR} не найдена! Создайте её и положите туда красивые картинки космоса.`,
  );
  process.exit(1);
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const passwordService = new PasswordService();
function simulateFileUpload(prefix: string = 'seed') {
  // Получаем список файлов в папке ассетов
  const files = fs
    .readdirSync(SEED_ASSETS_DIR)
    .filter((file) => file.match(/\.(jpg|jpeg|png|webp)$/i));

  if (files.length === 0) {
    const randomName = `${prefix}-${faker.string.uuid()}.jpg`;
    return {
      url: faker.image.urlLoremFlickr({ category: 'space' }),
      filename: randomName,
      originalName: 'random-faker.jpg',
    };
  }
  const randomFile = faker.helpers.arrayElement(files);
  const extension = path.extname(randomFile);
  const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
  const sourcePath = path.join(SEED_ASSETS_DIR, randomFile);
  const destPath = path.join(UPLOADS_DIR, uniqueFilename);

  // Копируем файл
  fs.copyFileSync(sourcePath, destPath);
  return {
    url: `/static/${uniqueFilename}`,
    filename: uniqueFilename,
    originalName: randomFile,
  };
}

async function clearDatabase() {
  console.log('🧹 Очистка базы данных и папки uploads...');
  await prisma.photo.deleteMany();
  await prisma.content.deleteMany();
  await prisma.item.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
}

async function createUser(password: string) {
  const salt = passwordService.getSalt();
  const hash = passwordService.getHash(password, salt);
  const avatarData = simulateFileUpload('avatar');

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
          url: faker.datatype.boolean() ? avatarData.url : faker.image.avatar(),
          filename: avatarData.filename,
          originalName: avatarData.originalName,
        },
      },
    },
  });
}

function generatePhotosForItem() {
  const count = faker.number.int({ min: 1, max: 4 });
  return Array.from({ length: count }).map(() => {
    return simulateFileUpload('space-item');
  });
}

async function main() {
  console.log('🌱 Начинаем сидинг (Local Assets Mode)...');

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
  const spaceObjects = [
    {
      type: 'черная дыра',
      sub: ['сверхмассивная', 'звездной массы'],
      names: ['TON 618', 'Sagittarius A*', 'Cygnus X-1'],
    },
    {
      type: 'галактика',
      sub: ['спиральная', 'эллиптическая'],
      names: ['Андромеда', 'Млечный путь', 'Водоворот'],
    },
    {
      type: 'туманность',
      sub: ['эмиссионная', 'планетарная'],
      names: ['Ориона', 'Кольцо', 'Конская голова'],
    },
    {
      type: 'звезда',
      sub: ['красный гигант', 'нейтронная'],
      names: ['Бетельгейзе', 'Сириус', 'Вега'],
    },
  ];

  for (let i = 0; i < 50; i++) {
    const author = faker.helpers.arrayElement(users);
    const randomObj = faker.helpers.arrayElement(spaceObjects);
    const title = `${faker.helpers.arrayElement(randomObj.names)} ${faker.number.int({ min: 1, max: 999 })}`;

    itemsPromises.push(
      prisma.item.create({
        data: {
          title: title,
          published: true,
          authorId: author.id,
          content: {
            create: {
              type: randomObj.type,
              subtype: faker.helpers.arrayElement(randomObj.sub),
              size: `${faker.number.int({ min: 1000, max: 9000000 })} км`,
            },
          },
          photos: {
            create: generatePhotosForItem(),
          },
          createdAt: faker.date.recent({ days: 60 }),
        },
      }),
    );
  }
  await prisma.$transaction(itemsPromises);

  console.log('✨ Сид успешно завершен! Фотографии скопированы в uploads.');
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

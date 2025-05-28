import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ✅ 기존 데이터 모두 삭제
  await prisma.memberMission.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.userStoreReview.deleteMany();
  await prisma.userFavorCategory.deleteMany();
  await prisma.store.deleteMany();
  await prisma.foodCategory.deleteMany();
  await prisma.user.deleteMany();

  // ✅ 1. User (1명)
  const user = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      gender: '여',
      birth: new Date('1995-03-01'),
      address: '서울시 강남구',
      detailAddress: '101호',
      phoneNumber: '010-1234-0001',
    },
  });

  // ✅ 2. Store (1개)
  const store = await prisma.store.create({
    data: { name: '카츠왕', regionName: '강남구' },
  });

  // ✅ 3. 리뷰 4개
  await Promise.all([
    prisma.userStoreReview.create({
      data: {
        userId: user.id,
        storeId: store.id,
        content: '정말 맛있어요!',
        score: 5,
      },
    }),
    prisma.userStoreReview.create({
      data: {
        userId: user.id,
        storeId: store.id,
        content: '양도 푸짐해요.',
        score: 4,
      },
    }),
    prisma.userStoreReview.create({
      data: {
        userId: user.id,
        storeId: store.id,
        content: '친절한 서비스!',
        score: 5,
      },
    }),
    prisma.userStoreReview.create({
      data: {
        userId: user.id,
        storeId: store.id,
        content: '재방문의사 있어요.',
        score: 4,
      },
    }),
  ]);

  // ✅ 4. 미션 3개
  const missions = await Promise.all([
    prisma.mission.create({
      data: {
        storeId: store.id,
        name: '인스타 인증샷',
        reward: 3000,
        missionSpec: '가게 음식 사진 인스타그램에 올리기',
      },
    }),
    prisma.mission.create({
      data: {
        storeId: store.id,
        name: '리뷰 남기기',
        reward: 2000,
        missionSpec: '블로그에 리뷰 작성',
      },
    }),
    prisma.mission.create({
      data: {
        storeId: store.id,
        name: '친구와 방문',
        reward: 5000,
        missionSpec: '친구 1명과 함께 방문 후 인증샷',
      },
    }),
  ]);

  // ✅ 5. 진행 중 미션 3개
  await Promise.all([
    prisma.memberMission.create({
      data: {
        memberId: user.id,
        missionId: missions[0].id,
        status: '진행중',
      },
    }),
    prisma.memberMission.create({
      data: {
        memberId: user.id,
        missionId: missions[1].id,
        status: '진행중',
      },
    }),
    prisma.memberMission.create({
      data: {
        memberId: user.id,
        missionId: missions[2].id,
        status: '진행중',
      },
    }),
  ]);

  await prisma.foodCategory.createMany({
    data: [
      { name: "한식" },
      { name: "일식" },
      { name: "중식" },
      { name: "양식" },
      { name: "치킨" },
      { name: "분식" },
      { name: "고기/구이" },
      { name: "도시락" },
      { name: "야식(족발,보쌈)" },
      { name: "패스트푸드" },
      { name: "디저트" },
      { name: "아시안푸드" },
    ],
  });
  
  console.log('✅ 시드 데이터 다수 생성 완료');
}

main()
  .catch((e) => {
    console.error('❌ Seed 실패:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

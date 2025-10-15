import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function upsertWord(
  lang: "sv" | "en" | "hu",
  lemma: string,
  extra?: Partial<Record<string, unknown>>,
) {
  return prisma.word.upsert({
    where: { language_lemma: { language: lang, lemma } },
    update: {},
    create: { language: lang, lemma, ...extra },
  });
}

async function link(sourceId: string, targetId: string) {
  return prisma.wordMeaning.upsert({
    where: { sourceId_targetId: { sourceId, targetId } },
    update: {},
    create: { sourceId, targetId },
  });
}

async function main() {
  // --- basic A1 words ---
  const svHej = await upsertWord("sv", "hej");
  const enHi = await upsertWord("en", "hi");
  const huSzia = await upsertWord("hu", "szia");

  await link(svHej.id, enHi.id);
  await link(svHej.id, huSzia.id);

  const svTack = await upsertWord("sv", "tack"); // thanks
  const enThanks = await upsertWord("en", "thanks");
  const huKosz = await upsertWord("hu", "köszönöm");
  await link(svTack.id, enThanks.id);
  await link(svTack.id, huKosz.id);

  const svFika = await upsertWord("sv", "fika", { pos: "noun" }); // coffee break
  const enCoffeeBreak = await upsertWord("en", "coffee break");
  await link(svFika.id, enCoffeeBreak.id);

  // examples
  await prisma.example.upsert({
    where: { id: "ex1" },
    update: {},
    create: {
      id: "ex1",
      wordId: svHej.id,
      sentence: "Hej! Hur mår du?",
      translation: "Hi! How are you?",
    },
  });

  // deck
  const basics = await prisma.deck.upsert({
    where: { slug: "a1-basics" },
    update: {},
    create: {
      slug: "a1-basics",
      title: "A1 Basics",
      description: "Greetings and essentials",
    },
  });

  for (const w of [svHej, svTack, svFika]) {
    await prisma.deckWord.upsert({
      where: { deckId_wordId: { deckId: basics.id, wordId: w.id } },
      update: {},
      create: { deckId: basics.id, wordId: w.id },
    });
  }

  console.log("✅ Seeded Swedish A1 basics (sv↔en/hu).");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

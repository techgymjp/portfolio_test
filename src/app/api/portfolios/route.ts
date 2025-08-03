import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

const readData = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const writeData = (data: unknown) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const db = readData();
  return NextResponse.json(db.portfolios);
}

export async function POST(request: Request) {
  const { title, description, url, imageUrl } = await request.json();
  const db = readData();
  const newPortfolio = {
    id: Date.now(),
    title,
    description,
    url,
    imageUrl,
  };
  db.portfolios.push(newPortfolio);
  writeData(db);
  return NextResponse.json(newPortfolio, { status: 201 });
}

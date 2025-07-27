import { NextResponse } from 'next/server';
import db from '../../../../db.json';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

export async function GET() {
  return NextResponse.json(db.portfolios);
}

export async function POST(request: Request) {
  const { title, description, url, imageUrl } = await request.json();
  const newPortfolio = {
    id: Date.now(), // Simple ID generation
    title,
    description,
    url,
    imageUrl,
  };
  db.portfolios.push(newPortfolio);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  return NextResponse.json(newPortfolio, { status: 201 });
}

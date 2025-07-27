import { NextResponse } from 'next/server';
import db from '../../../../../db.json';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const portfolio = db.portfolios.find((p) => p.id === parseInt(params.id));
  if (portfolio) {
    return NextResponse.json(portfolio);
  } else {
    return new Response('Portfolio not found', { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title, description, url, imageUrl } = await request.json();
  const portfolioIndex = db.portfolios.findIndex((p) => p.id === parseInt(params.id));

  if (portfolioIndex === -1) {
    return new Response('Portfolio not found', { status: 404 });
  }

  const updatedPortfolio = { ...db.portfolios[portfolioIndex], title, description, url, imageUrl };
  db.portfolios[portfolioIndex] = updatedPortfolio;

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  return NextResponse.json(updatedPortfolio);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const portfolioIndex = db.portfolios.findIndex((p) => p.id === parseInt(params.id));

  if (portfolioIndex === -1) {
    return new Response('Portfolio not found', { status: 404 });
  }

  db.portfolios.splice(portfolioIndex, 1);

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  return new Response(null, { status: 204 });
}

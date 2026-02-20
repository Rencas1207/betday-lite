import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const betData = await request.json();

    const filePath = path.resolve(process.cwd(), 'app/src/data/bets-me.json');
    const dirPath = path.dirname(filePath);

    console.log('Intentando escribir en:', filePath);

    await fs.mkdir(dirPath, { recursive: true });

    let data;
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (e) {
      console.log('Archivo no encontrado o vacío, creando nuevo objeto base.');
      data = { bets: [] };
    }

    if (!data.bets || !Array.isArray(data.bets)) {
      data.bets = [];
    }

    const newEntry = {
      id: `bet_${String(data.bets.length + 1).padStart(3, '0')}`,
      matchId: betData.items?.[0]?.matchId || 'match_unknown',
      placedAt: new Date().toISOString(),
      pick: betData.items?.[0]?.pick || 'UNKNOWN',
      odd: betData.items?.[0]?.odd || 0,
      stake: betData.montoTotal || 0,
      status: 'PENDING',
      return: null
    };

    data.bets.push(newEntry);

    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, 'utf8');

    return NextResponse.json({ success: true, message: 'Apuesta guardada' });
  } catch (error: Error | unknown) {
    console.error('Error detallado en el servidor:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        path:
          error instanceof Error && 'path' in error
            ? (error as unknown as { path: string }).path
            : undefined
      },
      { status: 500 }
    );
  }
}

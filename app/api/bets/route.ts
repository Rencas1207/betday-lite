import { supabase } from '@/app/src/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const betData = await request.json();

    const { data, error } = await supabase
      .from('bets')
      .insert(betData)
      .select();

    if (error) {
      console.error('Error de Supabase:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Apuesta generada con éxito',
      data
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

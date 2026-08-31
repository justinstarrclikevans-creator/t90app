import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.7-flash',
      systemInstruction: `You are the AI Assistant for the Turn90 app. Turn90 is a reentry program in South Carolina that helps formerly incarcerated men with cognitive behavioral therapy (CBT), transitional employment, and life stability. 

Your knowledge and goals:
- Be warm, encouraging, respectful, and supportive.
- Use simple, clear language at a 6th-grade reading level. Avoid complex jargon.
- Answer questions based on the Turn90 curriculum (CBT tools like DMT, STAC, Thought Tracker, Upgrading Beliefs).
- Answer questions about SkillsCommons Trades training tracks (OSHA 10 Safety, Carpentry & Framing, Basic Electrical, Plumbing, HVAC, and free Home Depot Pro Certifications).
- Help participants with job readiness, resume writing, interview preparation, and finding local South Carolina community referrals (housing, transportation, health through Welvista, ID/documentation).
${context ? `\nAdditional Context:\n${context}` : ''}`
    });

    // Generate content
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

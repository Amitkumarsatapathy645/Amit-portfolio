// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Check if all fields are provided
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Send the email with sender's email in the body
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Use your email as the sender, but include the name
      to: 'amitkumarsatapathy645@gmail.com', // Replace with your actual email
      subject: `New message from ${name} (${email})`, // Include sender's email in subject
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`, 
    });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
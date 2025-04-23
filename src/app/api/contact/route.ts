import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // In a real application, you would:
    // 1. Validate the input data
    // 2. Store the message in a database
    // 3. Send notification emails to staff
    // 4. Set up auto-responders

    // For this example, we'll just log the data and return a success response
    console.log("Contact form submission received:", body);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully. We will get back to you soon.",
        reference: `MSG-${Date.now()}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

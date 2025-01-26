function doPost(e) {
    try {
        var params = e.parameters;

        // Extract form data
        var name = sanitizeInput(params.name[0]);
        var email = sanitizeInput(params.email[0]);
        var message = sanitizeInput(params.message[0]);

        // Validate email format
        if (!validateEmail(email)) {
            throw new Error("Invalid email format.");
        }

        // Configure email
        var recipient = "piusvictor334@gmail.com"; // Replace with your Gmail address
        var subject = "New Contact Form Submission";
        var body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // Log the email content for debugging (can be removed for production)
        Logger.log("Sending email to: " + recipient);
        Logger.log("Email content: " + body);

        // Send the email
        GmailApp.sendEmail(recipient, subject, body);

        // Return success response
        return ContentService.createTextOutput("Message Sent Successfully").setMimeType(ContentService.MimeType.TEXT);
    } catch (error) {
        Logger.log("Error: " + error.message);
        return ContentService.createTextOutput("Failed to send message: " + error.message).setMimeType(ContentService.MimeType.TEXT);
    }
}

// Function to sanitize input (to prevent malicious scripts)
function sanitizeInput(input) {
    return input.replace(/<[^>]*>/g, ""); // Removes any HTML tags from the input
}

// Function to validate email format
function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

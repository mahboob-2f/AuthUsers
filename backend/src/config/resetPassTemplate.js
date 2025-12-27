
export const resetPasswordTemplate =(otp) =>{
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 20px;">
        
        <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
                <div style="width: 48px; height: 48px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-size: 24px;">🔐</span>
                </div>
                <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.2;">Password Reset Request</h1>
                <p style="font-size: 16px; opacity: 0.9; margin: 0;">Secure Your Account</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <p style="color: #475569; margin-bottom: 25px; line-height: 1.7;">
                    Hello there,<br><br>
                    We received a request to reset your password. Use the OTP code below to proceed with resetting your password. This code will expire in <strong style="color: #4f46e5;">10 minutes</strong>.
                </p>
                
                <!-- OTP Box -->
                <div style="background: linear-gradient(135deg, #f6f8ff 0%, #f0f4ff 100%); border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center; border: 1px solid #e0e7ff;">
                    <p style="font-size: 14px; color: #64748b; margin-bottom: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                    <div style="font-size: 42px; font-weight: 700; color: #4f46e5; letter-spacing: 8px; margin: 10px 0; font-family: 'Courier New', monospace; word-break: break-all;">
                        ${otp}
                    </div>
                    <p style="font-size: 14px; color: #64748b; margin-top: 10px;">Enter this code on the password reset page</p>
                </div>
                
                <p style="color: #475569; margin-bottom: 25px; line-height: 1.7;">
                    If you didn't request this password reset, please ignore this email or contact our support team if you have concerns about your account security.
                </p>
                
                <!-- Info Box -->
                <div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin-top: 30px;">
                    <p style="font-size: 14px; color: #64748b; margin: 0;">
                        <strong style="color: #475569;">💡 Need help?</strong><br>
                        For security reasons, never share this OTP with anyone. Our team will never ask for your verification code.
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 25px 30px; color: #94a3b8; font-size: 14px; border-top: 1px solid #e2e8f0; background: #f8fafc;">
                <p style="margin: 0 0 10px 0;">
                    This email was sent for password reset request. If you didn't initiate this request, please secure your account.
                </p>
                <p style="margin: 0;">
                    © ${new Date().getFullYear()} Your Company. All rights reserved.
                </p>
            </div>
            
        </div>
        
    </body>
    </html>
    `
}
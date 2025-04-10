const thanks = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            color: #4CAF50;
            margin: 0;
        }
        .content {
            text-align: center;
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            padding: 15px 0;
        }
        .button {
            display: inline-block;
            background: #4CAF50;
            color: #ffffff;
            padding: 10px 20px;
            margin-top: 15px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .button:hover {
            background: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Signup Successful!</h1>
        </div>
        <div class="content">
            <p>Dear <strong>{{name}}</strong>,</p>
            <p>Congratulations! You have successfully signed up on our platform.</p>
            <p>We're excited to have you on board. Click the button below to log in to your account.</p>
            <a href="{{login_url}}" class="button">Login Now</a>
            <p>If you didn't sign up, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>© 2025 Our Platform. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>`
module.exports= thanks;

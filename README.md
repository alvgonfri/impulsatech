# ImpulsaTech

ImpulsaTech is a crowdfunding web platform focused on causes aimed at closing the digital divide. ImpulsaTech allows individuals and organizations to create campaigns to support initiatives that promote the use of information and communication technologies among those who face difficulties accessing or using these technologies. Additionally, the platform manages both monetary donations and time donations, enabling users to contribute financial resources or volunteer work to advance these initiatives.

## Main features

- **Campaign creation**: create a campaign providing a motivating description, a representative image and choosing a deadline to reach the goals. Decide if you want to set an economic, time goal or both.
- **Financial donations**: donate money to the campaigns you are interested in and contribute economically to the cause.
- **Time donations**: donate your time to carry out volunteer activities or technological advice.
- **Reinvestment of financial donations**: what happens if a campaign to which you have donated money is cancelled? you will have the possibility to reinvest your donation in another campaign.
- **Time record**: keep track of the time you have donated to the campaigns and the activities you have carried out.
- **Post updates**: share your progress, achievements, and updates with the people who have donated to your campaign.
- **User profile**: visualize your personal information, as well as information about your campaigns or your donations.
- **Campaign search**: search for campaigns according to different criteria, such as the name, the deadline, the money or time remaining to reach the goal, etc.

## Technologies

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.
- **Frontend**: React.js, Tailwind CSS.
- **Testing**: Jest, Vitest.
- **CI/CD**: GitHub Actions.
- **Deployment**: Vercel, MongoDB Atlas.

## Installation

### Pre-requisites

- Node.js installed on your machine. You can download it from the Node.js website (https://nodejs.org/en). This project uses Node.js version v20.11.1.

- MongoDB installed and running on your machine. You can download it from the MongoDB website (https://www.mongodb.com/try/download/community). This project uses MongoDB version 7.0.5.

### Project setup

1. Clone the repository and open a terminal in the project folder:

```bash
git clone https://github.com/alvgonfri/impulsatech.git
```

2. Navigate to the backend folder:

```bash
cd backend
```

3. Make a copy of the `.env.example` file in the backend folder, named `.env`. At this time, no changes are necessary to the variables in the file.

4. Install backend dependencies:

```bash
npm install
```

5. Start the backend server:

```bash
npm run dev
```

6. Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

7. Make a copy of the `.env.example` file in the frontend folder, named `.env`. At this time, no changes are necessary to the variables in the file.

8. Install frontend dependencies:

```bash
npm install
```

9. Start the frontend server:

```bash
npm run dev
```

10. The address http://localhost:5173/ will be displayed in the console, which you can use to access the ImpulsaTech platform.

At this point, you can test the system, excluding two functionalities: financial donations and image uploads. To enable financial donations, follow the Stripe setup steps. For profile or campaign image uploads, follow the Cloudinary setup steps.

### Stripe setup

Stripe is an online payment processing platform that allows secure payment management. To set up Stripe, follow these steps:

1. Go to the Stripe website (https://stripe.com/) and sign up or log in.

2. Obtain your public and private keys from https://dashboard.stripe.com/test/apikeys.

3. In the `.env` file in the frontend, change the value of the `VITE_STRIPE_PUBLIC_KEY` variable to your public key.

4. In the `.env` file in the backend, change the value of the `STRIPE_SECRET_KEY` variable to your private key.

5. Set up a webhook. Navigate to https://dashboard.stripe.com/test/webhooks and click on "Add endpoint". Choose "Test in a local environment".

6. In the code that appears on the right, find the value of the constant `endpointSecret` (line 22). This will be your webhook secret.

7. In the `.env` file in the backend, change the value of the `STRIPE_WEBHOOK_SECRET` variable to your webhook secret.

8. Download Stripe CLI by following step 1 on the following page (choose your operating system): https://stripe.com/docs/stripe-cli#install

9. Once downloaded and set up, open a terminal and run the following command:

```bash
stripe login
```

10. Wait for a few seconds until a message prompts you to press enter. Press enter and a browser tab will open where you must allow access.

11. Return to the terminal and run the following command:

```bash
stripe listen --forward-to localhost:3000/api/v1/webhook
```

12. Open https://dashboard.stripe.com/test/webhooks and ensure the configured webhook appears.

After completing these steps and restarting the backend and frontend servers, you can test financial donations. Use test cards from https://stripe.com/docs/testing#cards for payments.

### Cloudinary setup

Cloudinary is a platform offering cloud-based image and video management services. To set up Cloudinary, follow these steps:

1. Go to the Cloudinary website (https://cloudinary.com/) and sign up or log in.

2. Once logged in, access the "Programmable Media/Dashboard" section where you can obtain your Cloud name, API key, and API secret.

3. Configure the corresponding variables in the `.env` file in the backend with the values obtained from the Cloudinary Dashboard.

After completing these steps and restarting the backend and frontend servers, you can upload images to the ImpulsaTech platform.

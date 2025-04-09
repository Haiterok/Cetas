// у файлі .env потрібно вказати ваш email та згенерований пароль через https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4OCfpXbMBvrIAaTeAlqt8xfH9_8GCt65Y9RDn8nDyUKqsUlgZDrL6h2xSCSk77WPC3XBNlQY8n-SjWNwd6kst_jKE70wICphzuCdkCMmSrQKeGrTTU

import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  // відправка листів
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // ваш email з файлу .env
    pass: process.env.EMAIL_PASS, // ваш спеціальний поштовий пароль з файлу .env
  },
});

app.post("/send-email", async (req, res) => {
  const { receiverEmail, receiverName, receiverPhone } = req.body;

  if (!receiverEmail || !receiverName || !receiverPhone) {
    return res.status(400).json({ message: "Всі поля є обов'язковими" });
  }

  try {
    //try catch для відправки листа
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiverEmail,
      subject: "Ми побачили вашу заявку",
      text: `Привіт ${receiverName}! Ми отримали вашу заявку. Дякуємо за ваш інтерес до нашого продукту. Ми зв'яжемося з вами найближчим часом.`,
      html: `<h1>Привіт ${receiverName}!</h1>
               <p>Ми отримали вашу заявку. Дякуємо за ваш інтерес до нашої фірми. Ми зв'яжемося з вами найближчим часом.</p>`,
    });

    res.status(200).json({ message: "Вдалося відправити повідомлення" });
  } catch (err) {
    console.error("Помилка при відправленні повідомлення:", err);
    res.status(500).json({ message: "Не вдалося відправити повідомлення" });
  }

  try {
    //try catch для запису даних у файл
    const data = {
      receiverEmail: receiverEmail,
      receiverName: receiverName,
      receiverPhone: receiverPhone,
    };

    const filePath = path.join(process.cwd(), "data.json");

    let existingData = []; // масив де записуються дані з файлу
    const fileContents = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(fileContents);

    existingData.push(data);

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2)); // записуємо дані з масиву у файл
    console.log("Данні записані успішно!");
  } catch (err) {
    console.error("Помилка при запису даних у файл:", err);
    res.status(500).json({ message: "Не вдалося відправити повідомлення" });
  }
});

app.post("/newsletter", async (req, res) => {
  /* console.log(req.body); */
  const { receiverEmail, receiverName } = req.body;

  if (!receiverEmail || !receiverName) {
    return res.status(400).json({ message: "Всі поля є обов'язковими" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiverEmail,
      subject: "Дякуєм що підписалися на нашу розсилку",
      text: `Привіт ${receiverName}! Дякуємо, що підписалися на нашу розсилку. Ми будемо надсилати вам найновіші новини та акції.`,
      html: `<h1>Привіт ${receiverName}!</h1>
               <p>Дякуємо, що підписалися на нашу розсилку. Ми будемо надсилати вам найновіші новини та акції.</p>`,
    });

    res.status(200).json({ message: "Вдалося відправити повідомлення" });
  } catch (err) {
    console.error("Помилка при відправленні повідомлення:", err);
    res.status(500).json({ message: "Не вдалося відправити повідомлення" });
  }

  try {
    //try catch для запису даних у файл
    const data = {
      receiverEmail: receiverEmail,
      receiverName: receiverName,
    };

    const filePath = path.join(process.cwd(), "newsletter_data.json");

    let existingData = []; // масив де записуються дані з файлу
    const fileContents = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(fileContents);

    existingData.push(data);

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2)); // записуємо дані з масиву у файл
    console.log("Данні записані успішно!");
  } catch (err) {
    console.error("Помилка при запису даних у файл:", err);
    res.status(500).json({ message: "Не вдалося відправити повідомлення" });
  }
});

app.listen(process.env.PORT || 4001, () => {
  console.log(`Сервер працює на http://localhost:${process.env.PORT || 4001}`);
});

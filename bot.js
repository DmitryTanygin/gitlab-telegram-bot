const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const telegramBotToken = '<bot-token>';
const chatId = '<chat-id>';

app.post('/webhook', (req, res) => {
    console.log(req.body);
    const { project, object_attributes, user, object_kind } = req.body;

    // Проверяем, что запрос действительно от GitLab и содержит необходимые данные
    if (project && user && object_kind) {
    // Формируем сообщение для отправки в Telegram
        const message = `
            GitLab Event: ${object_kind}
            Project: ${project.name}
            Link: (${object_attributes.url})
            User: ${user.name} (${user.username})`;

    // Отправляем сообщение в Telegram
    axios
        .post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        })
        .then(() => {
            console.log('Уведомление успешно отправлено в Telegram');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error('Ошибка при отправке уведомления в Telegram:', error);
            res.sendStatus(500);
        });
    } else {
        console.error('Некорректный запрос от GitLab');
        res.sendStatus(400);
    }
});
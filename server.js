const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname)); // чтобы main.html и photos были доступны

// Эндпоинт для списка изображений
app.get('/get-images', (req, res) => {
    const folderPath = path.join(__dirname, 'photos');
    fs.readdir(folderPath, (err, files) => {
        if(err){
            return res.status(500).json({error: "Не удалось прочитать папку"});
        }
        // Фильтруем только изображения
        const images = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
        res.json(images);
    });
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));

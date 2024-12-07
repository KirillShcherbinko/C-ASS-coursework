import {v4 as uuidv4} from "uuid";
import {resolve} from "path";
import { promises as fs } from "fs";

class FileService {
    // Метод для сохранения файла на диске
    static saveFile(file) {
        try {
            // Формируем уникальное имя для файла
            const fileName = uuidv4() + ".jpg";

            // Сохраняем файл в катологе
            const filePath = resolve("static", fileName);
            file.mv(filePath);

            return fileName;
        } catch(err) {
            throw new Error(err.message);
        }
    }


    // Метод для удаления файла
    static deleteFile(fileName) {
        try {
            const filePath = resolve("static", fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default FileService;
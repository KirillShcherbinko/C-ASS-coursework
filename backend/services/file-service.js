import {v4 as uuidv4} from "uuid"
import {resolve} from "path"

class FileService {
    
    // Метод для сохранения файла на диске
    static saveFile(file) {
        try {
            // Формируем уникальное имя для файла
            const fileName = uuidv4() + ".jpg"

            // Сохраняем файл в катологе
            const filePath = resolve("static", fileName)
            file.mv(filePath)

            return fileName
        } catch(e) {
            throw new Error("File not saved")
        }
    }
}

export default FileService
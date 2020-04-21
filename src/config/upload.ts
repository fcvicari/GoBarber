import path from 'path';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'temp'),
    filename(request, file, callback) {
      const [, filetype] = file.originalname.split('.');
      const filename = `${request.user.id}.${filetype}`;

      return callback(null, filename);
    },
  }),
};

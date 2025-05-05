import * as admin from 'firebase-admin';
import * as serviceAccount from '../../configs/firebase-key.json'; // Đường dẫn tới file key bạn có

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

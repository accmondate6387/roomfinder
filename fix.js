const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('d:/RoomFinder/src', function(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/import\s*\{\s*connectDB\s*\}\s*from\s*['"]@\/lib\/db\/connection['"]/g, 'import { connectToDatabase as connectDB } from "@/lib/db/connection"');
  content = content.replace(/import\s*\{\s*Property\s*\}\s*from\s*['"]@\/lib\/db\/models\/Property['"]/g, 'import Property from "@/lib/db/models/Property"');
  content = content.replace(/import\s*\{\s*User\s*\}\s*from\s*['"]@\/lib\/db\/models\/User['"]/g, 'import User from "@/lib/db/models/User"');
  content = content.replace(/import\s*\{\s*OwnerVerification\s*\}\s*from\s*['"]@\/lib\/db\/models\/OwnerVerification['"]/g, 'import OwnerVerification from "@/lib/db/models/OwnerVerification"');
  content = content.replace(/import\s*\{\s*Review\s*\}\s*from\s*['"]@\/lib\/db\/models\/Review['"]/g, 'import Review from "@/lib/db/models/Review"');
  content = content.replace(/import\s*\{\s*Report\s*\}\s*from\s*['"]@\/lib\/db\/models\/Report['"]/g, 'import Report from "@/lib/db/models/Report"');
  content = content.replace(/import\s*\{\s*Favorite\s*\}\s*from\s*['"]@\/lib\/db\/models\/Favorite['"]/g, 'import Favorite from "@/lib/db/models/Favorite"');
  content = content.replace(/import\s*\{\s*PropertyView\s*\}\s*from\s*['"]@\/lib\/db\/models\/PropertyView['"]/g, 'import PropertyView from "@/lib/db/models/PropertyView"');
  content = content.replace(/import\s*\{\s*Notification\s*\}\s*from\s*['"]@\/lib\/db\/models\/Notification['"]/g, 'import Notification from "@/lib/db/models/Notification"');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed imports in', filePath);
  }
});

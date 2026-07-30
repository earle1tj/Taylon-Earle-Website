import { randomBytes, scryptSync } from "node:crypto";

function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdin.setRawMode) {
      reject(new Error("Run this command in an interactive terminal."));
      return;
    }

    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    let value = "";

    const finish = () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write("\n");
      process.stdin.removeListener("data", onData);
      resolve(value);
    };

    const onData = (key) => {
      if (key === "\u0003") {
        process.stdin.setRawMode(false);
        process.stdout.write("\n");
        process.exit(130);
      }
      if (key === "\r" || key === "\n") {
        finish();
        return;
      }
      if (key === "\u007f" || key === "\b") {
        if (value.length) {
          value = value.slice(0, -1);
          process.stdout.write("\b \b");
        }
        return;
      }
      if (/^[\x20-\x7E]+$/.test(key)) {
        value += key;
        process.stdout.write("*".repeat(key.length));
      }
    };

    process.stdin.on("data", onData);
  });
}

const password = await readHidden("Choose a Journal Studio password: ");
const confirmation = await readHidden("Confirm the password: ");

if (password !== confirmation) throw new Error("Passwords do not match.");
if (password.length < 14) {
  throw new Error("Use at least 14 characters for the Studio password.");
}

const salt = randomBytes(24).toString("base64url");
const key = scryptSync(password, salt, 64).toString("base64url");
const sessionSecret = randomBytes(48).toString("base64url");

console.log("\nAdd these exact values to cPanel Environment Variables:\n");
console.log(`JOURNAL_ADMIN_PASSWORD_HASH=scrypt$${salt}$${key}`);
console.log(`SESSION_SECRET=${sessionSecret}`);
console.log("\nClose the terminal after saving them in cPanel.");

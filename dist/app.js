"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)());
// Enable body parser middleware for JSON data
app.use(express_1.default.json());
// Enable extended URL encoding
app.use(express_1.default.urlencoded({ extended: true }));
// Hello, World! route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Connect to MongoDB using Mongoose
const connectToDatabase = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            throw new Error('MongoDB URI is not defined in the environment variables.');
        }
        await mongoose_1.default.connect(mongodbUri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
connectToDatabase();
exports.default = app;
//# sourceMappingURL=app.js.map
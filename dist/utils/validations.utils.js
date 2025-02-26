"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
class ValidationUtils {
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidPhone(phone) {
        const phoneValidation = (phone.length < 11 || phone.length < 10);
        return phoneValidation;
    }
    static isValidPassword(password) {
        return password.length >= 8;
    }
}
exports.ValidationUtils = ValidationUtils;
//# sourceMappingURL=validations.utils.js.map
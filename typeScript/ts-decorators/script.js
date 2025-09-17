var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function Log(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Method ".concat(propertyKey, " was called"));
        return originalMethod.apply(this, args);
    };
}
function timeTaken(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var startTime = performance.now();
        var result = originalMethod.apply(this, args);
        var endTime = performance.now();
        console.log("".concat(propertyKey, " took ").concat(endTime - startTime, "ms"));
        return result;
    };
}
function applyDiscount(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function (price, discount) {
        var discountPrice = price * (discount / 100);
        var finalPrice = price - discountPrice;
        console.log(finalPrice);
        return finalPrice;
    };
}
var DiscountCalculator = /** @class */ (function () {
    function DiscountCalculator() {
    }
    DiscountCalculator.prototype.calculatePrice = function (productPrice, discount) {
        return 0;
    };
    __decorate([
        Log,
        timeTaken,
        applyDiscount,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", Number)
    ], DiscountCalculator.prototype, "calculatePrice", null);
    return DiscountCalculator;
}());
document.addEventListener('DOMContentLoaded', function () {
    var priceInput = document.getElementById('product-price');
    var discountInput = document.getElementById('discount-percentage');
    var calculateBtn = document.getElementById('calculate-btn');
    var result = document.getElementById('result');
    var error = document.getElementById('error');
    var calculater = new DiscountCalculator();
    calculateBtn.addEventListener('click', function () {
        result.innerHTML = "";
        error.innerHTML = "";
        var price = parseFloat(priceInput.value);
        var discount = parseFloat(discountInput.value);
        if (isNaN(price) || price <= 0) {
            error.textContent = "Please enter a valid product price greater than 0.";
            return;
        }
        if (isNaN(discount) || discount < 0 || discount > 100) {
            error.textContent = "Please enter a valid discount percentage (0-100).";
            return;
        }
        var finalPrice = calculater.calculatePrice(price, discount);
        priceInput.value = "";
        discountInput.value = "";
        result.textContent = "Final Price (after Discount): ".concat(finalPrice.toFixed(2));
    });
});

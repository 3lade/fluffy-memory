export {};

function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Method ${propertyKey} was called`)
        return originalMethod.apply(this, args)
    }
}

function timeTaken(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const startTime = performance.now();
        const result = originalMethod.apply(this, args);
        const endTime = performance.now();

        console.log(`${propertyKey} took ${(endTime - startTime).toFixed(2)}ms`);
        return result;
    }
}


function applyDiscount(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(price: number, discount: number): number {
        const discountPrice = price * (discount / 100);
        const finalPrice = price - discountPrice;
        console.log(finalPrice)
        return finalPrice;
    }
}


class DiscountCalculator {
    // @Log
    // @timeTaken
    // @applyDiscount
    calculatePrice(productPrice: number, discount: number): number {
        return 0;
    }
}

document.addEventListener('DOMContentLoaded', ()=> {

    const priceInput = document.getElementById('product-price') as HTMLInputElement;
    const discountInput = document.getElementById('discount-percentage') as HTMLInputElement;
    const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
    const result = document.getElementById('result') as HTMLHeadElement;
    const error = document.getElementById('error') as HTMLHeadElement;


    const calculater = new DiscountCalculator();

    calculateBtn.addEventListener('click', () => {

        result.innerHTML = "";
        error.innerHTML = "";

        const price = parseFloat(priceInput.value);
        const discount = parseFloat(discountInput.value);

        if(isNaN(price) || price<=0)
        {
            error.textContent = "Please enter a valid product price greater than 0.";
            return;
        }

        if(isNaN(discount) || discount < 0 || discount > 100)
        {
            error.textContent = "Please enter a valid discount percentage (0-100).";
            return
        }

        const finalPrice = calculater.calculatePrice(price, discount)

        priceInput.value = "";
        discountInput.value = "";

        result.textContent = `Final Price (after Discount): ${finalPrice.toFixed(2)}`

    })
})
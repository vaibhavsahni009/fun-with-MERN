
const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} = require("../src/math");

// test("hello world", () => {});
// test("test 2", () => {
//   throw new Error("fail");
// });

test("should calculate tip",()=>{
    const total=calculateTip(10,0.3)
    expect(total).toBe(13)
})

test("should calculate default tip",()=>{
    const total=calculateTip(10)
    expect(total).toBe(12.5)
})

test("calculate farenheit",()=>{
    const farenheit=celsiusToFahrenheit(0)
    expect(farenheit).toBe(32)
})

test("calculate celsuis",()=>{
    const celsuis=fahrenheitToCelsius(32)
    expect(celsuis).toBe(0)
})
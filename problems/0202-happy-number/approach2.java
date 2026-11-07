class Solution {
    public boolean isHappy(int n) {
        while (n != 1 && n != 4) { // every unhappy number falls into the loop 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 // @viz loop
            int sum = 0; // @viz step
            for (; n > 0; n /= 10) sum += (n % 10) * (n % 10); // @viz step
            n = sum; // @viz step
        }
        return n == 1; // @viz return
    }
}

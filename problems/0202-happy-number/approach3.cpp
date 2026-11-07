class Solution {
public:
    bool isHappy(int n) {
        int slow = n, fast = next(n); // fast moves two steps for each step of slow // @viz init
        while (fast != 1 && slow != fast) { // either fast reaches 1, or it laps slow inside a loop // @viz loop
            slow = next(slow); // @viz move
            fast = next(next(fast)); // @viz move
        }
        return fast == 1; // @viz return
    }
private:
    int next(int n) { // the sum of the squares of the digits
        int sum = 0;
        for (; n > 0; n /= 10) sum += (n % 10) * (n % 10);
        return sum;
    }
};

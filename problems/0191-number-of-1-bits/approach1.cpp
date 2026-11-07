class Solution {
public:
    int hammingWeight(int n) {
        int count = 0; // @viz init
        for (int i = 0; i < 32; ++i) // look at every bit position // @viz loop
            count += (n >> i) & 1; // bit i, moved down to position 0 // @viz test
        return count; // @viz return
    }
};

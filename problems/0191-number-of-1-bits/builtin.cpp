class Solution {
public:
    int hammingWeight(int n) {
        return __builtin_popcount(n); // std::popcount((unsigned)n) in C++20 <bit>
    }
};

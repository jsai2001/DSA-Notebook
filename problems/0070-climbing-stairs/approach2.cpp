class Solution {
public:
    int climbStairs(int n) {
        int prev = 1, cur = 1; // ways(0) and ways(1): standing still counts as one way // @viz init
        for (int k = 2; k <= n; ++k) { // step up from 1 to n // @viz loop
            int next = prev + cur; // ways(k) = ways(k - 1) + ways(k - 2) // @viz loop
            prev = cur; // @viz loop
            cur = next; // @viz loop
        }
        return cur; // @viz answer
    }
};

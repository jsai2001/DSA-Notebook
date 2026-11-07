#include <queue>
#include <vector>
class Solution {
public:
    int coinChange(std::vector<int>& coins, int amount) {
        if (amount == 0) return 0; // @viz base
        std::vector<char> seen(amount + 1, 0); // amounts already reached with fewer coins // @viz init
        seen[0] = 1; // @viz init
        std::queue<int> queue; // @viz init
        queue.push(0); // @viz init
        for (int steps = 1; !queue.empty(); ++steps) { // one BFS level per coin // @viz level
            for (int size = queue.size(); size > 0; --size) { // @viz level
                int a = queue.front(); // @viz add
                queue.pop(); // @viz add
                for (int c : coins) { // add one more coin // @viz add
                    long long b = (long long)a + c; // coins can be up to 2^31 - 1: avoid overflow // @viz add
                    if (b == amount) return steps; // the first time it's reached is with the fewest coins // @viz found
                    if (b < amount && !seen[b]) { // @viz add
                        seen[b] = 1; // @viz add
                        queue.push(b); // @viz add
                    }
                }
            }
        }
        return -1; // @viz none
    }
};

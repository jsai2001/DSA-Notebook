#include <vector>
class Solution {
public:
    int canCompleteCircuit(std::vector<int>& gas, std::vector<int>& cost) {
        const int n = gas.size(); // @viz init
        for (int start = 0; start < n; ++start) { // @viz start
            int tank = 0, k = 0; // @viz start
            for (; k < n; ++k) { // drive n legs from start // @viz drive
                int i = (start + k) % n; // @viz drive
                tank += gas[i] - cost[i]; // fill up at i, drive to i + 1 // @viz drive
                if (tank < 0) break; // ran dry before the next station // @viz fail
            }
            if (k == n) return start; // all n legs done // @viz found
        }
        return -1; // @viz none
    }
};

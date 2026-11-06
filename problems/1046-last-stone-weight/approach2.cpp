#include <algorithm>
#include <vector>
class Solution {
public:
    int lastStoneWeight(std::vector<int>& stones) {
        std::vector<int> s = stones; // @viz init
        std::sort(s.begin(), s.end()); // sort once, then keep it sorted // @viz init
        while (s.size() > 1) { // @viz loop
            int y = s.back(); // heaviest // @viz take
            s.pop_back(); // @viz take
            int x = s.back(); // second heaviest // @viz take
            s.pop_back(); // @viz take
            if (y != x) { // @viz smash
                int d = y - x; // @viz insert
                s.insert(std::upper_bound(s.begin(), s.end(), d), d); // binary search for its place, then insert there // @viz insert
            }
        }
        return s.empty() ? 0 : s[0]; // @viz return
    }
};

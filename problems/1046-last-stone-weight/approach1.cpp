#include <algorithm>
#include <vector>
class Solution {
public:
    int lastStoneWeight(std::vector<int>& stones) {
        std::vector<int> s = stones; // work on a copy // @viz init
        while (s.size() > 1) { // @viz loop
            std::sort(s.begin(), s.end()); // the two heaviest are now at the end // @viz sort
            int y = s.back(); // heaviest // @viz take
            s.pop_back(); // @viz take
            int x = s.back(); // second heaviest // @viz take
            s.pop_back(); // @viz take
            if (y != x) s.push_back(y - x); // equal stones both break; otherwise y - x is left // @viz smash
        }
        return s.empty() ? 0 : s[0]; // @viz return
    }
};

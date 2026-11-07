#include <algorithm>
#include <vector>
class Solution {
public:
    bool isNStraightHand(std::vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize) return false; // the cards must split evenly // @viz init
        std::vector<int> h(hand); // @viz init
        std::sort(h.begin(), h.end()); // @viz init
        while (!h.empty()) { // @viz group
            long long start = h[0]; // the smallest card left must start a group // @viz group
            for (long long x = start; x < start + groupSize; ++x) { // @viz take
                auto it = std::find(h.begin(), h.end(), x); // @viz fail
                if (it == h.end()) return false; // a missing card breaks the run // @viz fail
                h.erase(it); // O(n) // @viz take
            }
        }
        return true; // @viz return
    }
};

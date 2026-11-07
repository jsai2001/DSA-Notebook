#include <algorithm>
#include <unordered_map>
#include <vector>
class Solution {
public:
    bool isNStraightHand(std::vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize) return false; // the cards must split evenly // @viz init
        std::unordered_map<long long, int> count; // card -> copies left // @viz init
        for (int x : hand) ++count[x]; // @viz init
        std::vector<long long> keys; // @viz group
        for (auto& [x, c] : count) keys.push_back(x); // @viz group
        std::sort(keys.begin(), keys.end()); // smallest card first // @viz group
        for (long long x : keys) { // @viz group
            int c = count[x]; // every copy of x left must start its own group // @viz group
            if (c == 0) continue; // @viz group
            for (long long y = x; y < x + groupSize; ++y) { // start all c groups at once // @viz take
                auto it = count.find(y); // @viz fail
                if (it == count.end() || it->second < c) return false; // not enough y to go on // @viz fail
                it->second -= c; // @viz take
            }
        }
        return true; // @viz return
    }
};
